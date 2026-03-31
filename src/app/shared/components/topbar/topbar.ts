import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb';
import { ButtonComponent } from '../buttons/buttons';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, ButtonComponent],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss'
})
export class TopbarComponent {
  // El Dashboard dicta la ruta; lo estandarizamos temporalmente en el Layout superior
  currentPath: BreadcrumbItem[] = [
    { label: 'Administración', url: '/' },
    { label: 'Visión General' }
  ];

  cerrarSesion(): void {
    console.log('Sesión Terminada por Seguridad');
  }
}

