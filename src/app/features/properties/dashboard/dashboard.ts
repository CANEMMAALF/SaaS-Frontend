import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  breadcrumbPaths: BreadcrumbItem[] = [
    { label: 'Propiedades', url: '/propiedades', isLast: true }
  ];

  staticMessages = [
    { id: 1, title: 'Nuevo comunicado', text: 'Junta de vecinos este viernes a las 8:00 PM', date: 'Hoy' },
    { id: 2, title: 'Alerta de Mantenimiento', text: 'Revisión de elevadores programada', date: 'Ayer' },
    { id: 3, title: 'Pago recibido', text: 'Se registró un nuevo pago en Unidad 204', date: 'Hace 2 días' },
    { id: 4, title: 'Actualización del Sistema', text: 'Nuevas funciones de gestión disponibles', date: 'Hace 1 semana' }
  ];

  currentUser = { name: 'Administrador' };

  constructor() {}

  ngOnInit() {
    // Inicialización al cargar el módulo mediante lazy loading
  }
}
