import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../shared/components/table/table';
import { TableColumn } from '../../../shared/components/table/interface/table-column';
import { TableOptions } from '../../../shared/components/table/interface/table-options';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb';
import { MOCK_PROPIEDADES } from '../../../shared/components/table/json/mock-propiedades';
import { IPropertyDashboardItem } from '../../../core/models/property-dashboard.model';
import { PaymentStatus } from '../../../core/models/payment-status.enum';

export interface PropertyListViewModel {
  id: string;
  unidad: string;
  renta: number;
  saldoRestante: number;
  estado: PaymentStatus | 'PENDIENTE';
  raw: IPropertyDashboardItem;
}

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, TableComponent, BreadcrumbComponent],
  templateUrl: './property-list.html',
  styleUrl: './property-list.scss',
})
export class PropertyList implements OnInit {
  isLoading = false;
  
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Propiedades', url: '/propiedades' },
    { label: 'Listado', url: '/propiedades/lista' }
  ];

  misPropiedades: PropertyListViewModel[] = [];
  
  tableColumns: TableColumn<PropertyListViewModel>[] = [
    { key: 'unidad', header: 'Unidad', type: 'text' },
    { key: 'renta', header: 'Cuota / Renta', type: 'currency' },
    { key: 'saldoRestante', header: 'Saldo Restante', type: 'currency' },
    { key: 'estado', header: 'Estado Principal', type: 'badge' }
  ];

  tableActions: TableOptions<PropertyListViewModel>[] = [
    {
      label: 'Detalles',
      condition: () => true,
      handler: (item) => alert('Viendo detalles de: ' + item.unidad),
      cssClass: 'btn-action-primary'
    },
    {
      label: 'Cobrar',
      condition: (item) => item.estado === PaymentStatus.PENDIENTE || item.estado === PaymentStatus.PARCIAL,
      handler: (item) => alert('Generando cargo para: ' + item.unidad),
      cssClass: 'btn-action-warning'
    }
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.isLoading = true;
    
    // Convertimos Data Source a nuestro ViewModel asegurando tipo estricto en Runtime
    setTimeout(() => {
      this.misPropiedades = MOCK_PROPIEDADES.map(it => ({
        id: it.unidadId,
        unidad: it.nombreUnidad,
        renta: it.reciboActual ? it.reciboActual.montoTotal : 0,
        saldoRestante: it.reciboActual ? it.reciboActual.saldoRestante : 0,
        estado: it.reciboActual ? it.reciboActual.estado : PaymentStatus.PENDIENTE,
        raw: it
      }));
      this.isLoading = false;
      this.cdr.detectChanges();
    }, 1500);
  }

  onPageChange(newPage: number) {
    console.log('Cambiando a pagina:', newPage);
  }

  onActionClicked(event: any) {
    console.log('Se ejecutó accion general:', event);
  }
}

