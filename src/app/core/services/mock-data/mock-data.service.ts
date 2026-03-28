import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface PropertyStat {
  title: string;
  value: string;
  subtitle: string;
  trend: string;
  icon: string;
  colorClass: string;
}

// Alineado a la tabla "propiedades" y sus relaciones
export interface PropertyNode {
  id: string; // id de propiedad
  nombre_unidad: string; // nombre_unidad
  monto_renta_fijo: number; // monto_renta_fijo
  cliente_nombre: string; // joined de clientes_info.nombre_completo
  estado_recibo: 'PENDIENTE' | 'PAGADO' | 'PARCIAL'; // derivado de recibos y pagos_detalle
  deuda_restante: number; // calculado de recibos.monto_deuda - sum(pagos.monto_pagado)
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }

  getDashboardStats(): Observable<PropertyStat[]> {
    return of([
      { title: 'Total Unidades', value: '6', subtitle: 'Registradas', trend: '+2', icon: 'home', colorClass: 'blue' },
      { title: 'Inquilinos Activos', value: '5', subtitle: 'Con contrato', trend: '+1', icon: 'people', colorClass: 'green' },
      { title: 'Recibos Pendientes', value: '2', subtitle: 'Mes actual', trend: '-1', icon: 'receipt', colorClass: 'orange' },
      { title: 'Ingresos del Mes', value: '$8,500', subtitle: 'Cobrado', trend: '+15%', icon: 'payment', colorClass: 'purple' },
    ]).pipe(delay(500));
  }

  getProperties(): Observable<PropertyNode[]> {
    const props: PropertyNode[] = [
      { id: '1', nombre_unidad: 'Depto 4B', monto_renta_fijo: 5000, cliente_nombre: 'Carlos Ramírez López', estado_recibo: 'PAGADO', deuda_restante: 0 },
      { id: '2', nombre_unidad: 'Casa 12',  monto_renta_fijo: 8000, cliente_nombre: 'Ana María Sánchez', estado_recibo: 'PENDIENTE', deuda_restante: 8000 },
      { id: '3', nombre_unidad: 'Local Centro', monto_renta_fijo: 3500, cliente_nombre: 'Roberto Fernández', estado_recibo: 'PARCIAL', deuda_restante: 1500 },
      { id: '4', nombre_unidad: 'Depto 7C', monto_renta_fijo: 4500, cliente_nombre: 'Sin asignar', estado_recibo: 'PAGADO', deuda_restante: 0 },
      { id: '5', nombre_unidad: 'Casa 8',   monto_renta_fijo: 9000, cliente_nombre: 'Patricia Méndez Cruz', estado_recibo: 'PENDIENTE', deuda_restante: 9000 },
      { id: '6', nombre_unidad: 'Depto 3B', monto_renta_fijo: 6000, cliente_nombre: 'Luis Alberto García', estado_recibo: 'PAGADO', deuda_restante: 0 },
    ];
    return of(props).pipe(delay(700));
  }
}

