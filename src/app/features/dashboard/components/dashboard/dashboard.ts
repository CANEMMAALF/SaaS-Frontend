import { Component, OnInit } from '@angular/core';
import { Api } from '../../../../core/services/stateless/back/api';
import { ToggleSwitch } from '../../../../shared/components/toggle-switch/toggle-switch';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

export interface Receipt {
  id: string;
  amount: number;
  status: 'PENDIENTE' | 'PAGADO';
}

@Component({
  selector: 'app-dashboard',
  imports: [ToggleSwitch],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  receipts: Receipt[] = [];
  processingIds = new Set<string>();

  constructor(private apiService: Api) {}

  ngOnInit(): void {
    this.receipts = [
      { id: '101', amount: 3500, status: 'PENDIENTE' },
      { id: '102', amount: 4200, status: 'PAGADO' }
    ];
  }

  onTogglePayment(receipt: Receipt): void {
    const previousStatus = receipt.status;
    const newStatus = previousStatus === 'PENDIENTE' ? 'PAGADO' : 'PENDIENTE';

    receipt.status = newStatus;
    this.processingIds.add(receipt.id);

    this.apiService.updateReceiptStatus(receipt.id, newStatus).pipe(
      catchError((error) => {
        console.error(`Error HTTP en recibo ${receipt.id}. Revirtiendo cambios...`, error);
        receipt.status = previousStatus;
        return EMPTY;
      })
    ).subscribe(() => {
      this.processingIds.delete(receipt.id);
    });
  }

  isLoading(id: string): boolean {
    return this.processingIds.has(id);
  }
}
