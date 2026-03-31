import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, finalize, switchMap, delay } from 'rxjs/operators';
import { TableComponent } from '../../../../shared/components/table/table';
import { MOCK_PROPIEDADES } from '../../../../shared/components/table/json/mock-propiedades';
import { IPropertyDashboardItem } from '../../../../core/models/property-dashboard.model';
import { TableColumn } from '../../../../shared/components/table/interface/table-column';
import { PaymentStatus } from '../../../../core/models/payment-status.enum';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CobroModalComponent } from '../cobro-modal/cobro-modal';
import { Api } from '../../../../core/services/stateless/back/api';

export interface DashboardViewModel {
  id: string;
  unidad: string;
  saldoRestante: number;
  estado: PaymentStatus | 'PENDIENTE';
  raw: IPropertyDashboardItem;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TableComponent, MatDialogModule, MatSnackBarModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  propiedades$!: Observable<DashboardViewModel[]>;
  isLoading = false;

  // RxJS: Single Source of Truth trigger para refrescar los datos
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  tableColumns: TableColumn<DashboardViewModel>[] = [
    { key: 'unidad', header: 'Unidad', type: 'text' },
    { key: 'saldoRestante', header: 'Saldo Restante', type: 'currency' },
    { key: 'estado', header: 'Estado Financiero', type: 'badge' },
    { key: 'acciones', header: 'Cobranza', type: 'action_cobrar' }
  ];

  constructor(
    // Inyección nativa de Dialog gestionada por MatDialogModule
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private api: Api
  ) { }

  ngOnInit(): void {
    // Escuchamos recargas de tabla
    this.propiedades$ = this.refreshTrigger$.pipe(
      switchMap(() => {
        this.isLoading = true;
        // Retardo simulado para ver el Loading en Mocks
        return of(MOCK_PROPIEDADES).pipe(
          delay(800),
          map(items => items.map(item => ({
            id: item.unidadId,
            unidad: item.nombreUnidad,
            saldoRestante: item.reciboActual ? item.reciboActual.saldoRestante : 0,
            estado: item.reciboActual ? item.reciboActual.estado : PaymentStatus.PENDIENTE,
            raw: item
          }))),
          finalize(() => this.isLoading = false)
        );
      })
    );
  }

  abrirModalCobro(item: DashboardViewModel): void {
    const dialogRef = this.dialog.open(CobroModalComponent, {
      width: '400px',
      data: {
        unidadId: item.raw.unidadId,
        nombreUnidad: item.raw.nombreUnidad,
        saldoRestante: item.raw.reciboActual?.saldoRestante || 0
      }
    });

    dialogRef.afterClosed().subscribe((montoAbonado) => {
      // Verificación estricta del resultado (excluyendo clicks fuera del modal/cancelar)
      if (montoAbonado !== null && montoAbonado !== undefined) {
        this.isLoading = true; // Bloquear la UI

        // Consumir API Real
        this.api.registrarPagoAbono(item.raw.unidadId, montoAbonado).pipe(
          finalize(() => {
            this.isLoading = false; // Unlock UI siempre
          })
        ).subscribe({
          next: () => {
            this.snackBar.open(
              `Pago de $${montoAbonado.toLocaleString('es-MX')} registrado para ${item.unidad}`,
              'Cerrar',
              { duration: 4000, panelClass: ['snackbar-success'] }
            );

            // Regla Cumplida: Refrescar la tabla en caso de éxito
            this.refreshTrigger$.next();
          },
          error: (err) => {
            console.error('Error Crítico API:', err);
            this.snackBar.open(
              'Error al registrar el pago. Intente nuevamente.',
              'Aceptar',
              { duration: 5000, panelClass: ['snackbar-error'] }
            );
          }
        });
      }
    });
  }
}

