import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private readonly BASE_URL = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  updateReceiptStatus(receiptId: string, status: string): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/receipts/${receiptId}/status`, { status });
  }

  /**
   * Registra un nuevo abono para la deuda de la unidad de forma estricta.
   */
  registrarPagoAbono(unidadId: string, montoAbono: number): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/pagos`, { unidadId, montoAbono });
  }
}
