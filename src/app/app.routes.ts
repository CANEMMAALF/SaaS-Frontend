import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'propiedades', pathMatch: 'full' },
      { path: 'propiedades', loadComponent: () => import('./features/properties/dashboard/dashboard').then(m => m.DashboardComponent) },
      { path: 'propiedades/lista', loadComponent: () => import('./features/properties/property-list/property-list').then(m => m.PropertyList) }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent) },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'auth/login' }
];
