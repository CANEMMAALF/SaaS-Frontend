import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  navItems = [
    { label: 'Propiedades', path: '/propiedades', icon: 'home' },
    { label: 'Directorio de Vecinos', path: '/vecinos', icon: 'people' },
    { label: 'Recibos', path: '/recibos', icon: 'receipt' },
    { label: 'Pagos', path: '/pagos', icon: 'payment' }
  ];
}
