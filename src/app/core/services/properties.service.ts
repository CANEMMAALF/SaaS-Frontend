import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPropertyDashboardItem } from '../models/property-dashboard.model';
import { IRecibo } from '../models/recibo.model';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/properties'; // Ajustar de ser necesario

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las unidades para el dashboard principal.
   * Se asegura de que el reciboActual pueda ser nulo si no existe recibo en curso.
   * 
   * @returns Observable<IPropertyDashboardItem[]>
   */
  getAllUnidadesForDashboard(): Observable<IPropertyDashboardItem[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dashboard`).pipe(
      map(data => data.map(item => ({
        unidadId: item.unidadId,
        nombreUnidad: item.nombreUnidad,
        reciboActual: item.reciboActual ? {
          ...item.reciboActual,
          fechaGeneracion: new Date(item.reciboActual.fechaGeneracion),
          fechaVencimiento: new Date(item.reciboActual.fechaVencimiento)
        } : null,
        ultimoPago: item.ultimoPago ? new Date(item.ultimoPago) : null
      } as IPropertyDashboardItem)))
    );
  }

  /**
   * Registra un pago (total o parcial/abono).
   * 
   * @param data { reciboId: string, monto: number } - Monto estrictamente en tipo numérico.
   * @returns Observable<IRecibo> - El recibo actualizado.
   */
  registrarPago(data: { reciboId: string; monto: number }): Observable<IRecibo> {
    return this.http.post<any>(`${this.apiUrl}/pagos`, data).pipe(
      map(response => ({
        ...response,
        fechaGeneracion: new Date(response.fechaGeneracion),
        fechaVencimiento: new Date(response.fechaVencimiento)
      } as IRecibo))
    );
  }
}
