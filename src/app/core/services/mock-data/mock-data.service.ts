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

export interface PropertyNode {
  id: string;
  unidad: string;
  direccion: string;
  vecinoAsignado: string;
  adeudoAmount: number | null; // null if Al Corriente
  status: 'Al corriente' | 'Pendiente';
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }

  getDashboardStats(): Observable<PropertyStat[]> {
    return of([
      { title: 'Total Propiedades', value: '48', subtitle: 'Totales registradas', trend: '+12%', icon: 'home', colorClass: 'blue' },
      { title: 'Vecinos Activos', value: '42', subtitle: 'Residentes actuales', trend: '+8%', icon: 'people', colorClass: 'green' },
      { title: 'Recibos Pendientes', value: '15', subtitle: 'Por cobrar', trend: '-5%', icon: 'receipt', colorClass: 'orange' },
      { title: 'Propiedades con Adeudos', value: '6', subtitle: 'Cuentas atrasadas', trend: '-3%', icon: 'alert', colorClass: 'red' },
    ]).pipe(delay(500)); // Simulate network
  }

  getProperties(): Observable<PropertyNode[]> {
    const props: PropertyNode[] = [
      { id: '1', unidad: 'Depto 4B', direccion: 'Av. Principal 123, Piso 4', vecinoAsignado: 'Carlos Ramírez López', adeudoAmount: null, status: 'Al corriente' },
      { id: '2', unidad: 'Casa 12', direccion: 'Calle Los Pinos 456', vecinoAsignado: 'Ana María Sánchez', adeudoAmount: 2450, status: 'Pendiente' },
      { id: '3', unidad: 'Depto 1A', direccion: 'Av. Principal 123, Piso 1', vecinoAsignado: 'Roberto Fernández', adeudoAmount: null, status: 'Al corriente' },
      { id: '4', unidad: 'Depto 7C', direccion: 'Av. Principal 123, Piso 7', vecinoAsignado: 'Sin asignar', adeudoAmount: null, status: 'Al corriente' },
      { id: '5', unidad: 'Casa 8', direccion: 'Calle Los Pinos 234', vecinoAsignado: 'Patricia Méndez Cruz', adeudoAmount: 1890, status: 'Pendiente' },
      { id: '6', unidad: 'Depto 3B', direccion: 'Av. Principal 123, Piso 3', vecinoAsignado: 'Luis Alberto García', adeudoAmount: null, status: 'Al corriente' },
    ];
    return of(props).pipe(delay(700));
  }
}
