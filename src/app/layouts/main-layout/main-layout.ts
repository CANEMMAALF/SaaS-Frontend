import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent, NavItem } from '../../shared/components/sidebar/sidebar';
import { TopbarComponent, UserProfile } from '../../shared/components/topbar/topbar';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, TopbarComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayoutComponent {
  // Stateful Component: Maneja los datos que se pasan a los componentes visuales (Stateless)
  layoutNavItems: NavItem[] = [
    { label: 'Propiedades', path: '/propiedades', icon: 'home' },
    { label: 'Directorio de Vecinos', path: '/vecinos', icon: 'people' },
    { label: 'Pagos y Recibos', path: '/recibos', icon: 'receipt' }
  ];

  currentUser: UserProfile = {
    name: 'Administrador Principal',
    avatar: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff' // placeholder
  };
}
