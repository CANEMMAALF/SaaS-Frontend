import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { Dashboard } from './features/dashboard/components/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent, // El cascarón protege todas estas rutas hijas
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      // Futuras fases inyectarán la UI de lista de propiedades aquí...
      // { path: 'propiedades', component: PropertyListComponent }
    ]
  },
  // Redirección de seguridad ante rutas fantasma (404 Fallback)
  { path: '**', redirectTo: 'dashboard' }
];
