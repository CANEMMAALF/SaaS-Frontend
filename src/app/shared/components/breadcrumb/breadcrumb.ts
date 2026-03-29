import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  url: string;
  isLast?: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="breadcrumb-nav" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a routerLink="/" class="breadcrumb-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            Inicio
          </a>
        </li>
        <li class="breadcrumb-item" *ngFor="let item of items; let isLast = last" [class.active]="isLast" [attr.aria-current]="isLast ? 'page' : null">
          <span class="separator">/</span>
          <a *ngIf="!isLast" [routerLink]="item.url" class="breadcrumb-link">{{ item.label }}</a>
          <span *ngIf="isLast" class="breadcrumb-current">{{ item.label }}</span>
        </li>
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumb-nav {
      margin-bottom: 20px;
      font-size: 0.9rem;
    }
    .breadcrumb {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 0;
      margin: 0;
    }
    .breadcrumb-item {
      display: flex;
      align-items: center;
      color: #6c757d;
    }
    .breadcrumb-link {
      color: #0d8abc;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: color 0.2s;
    }
    .breadcrumb-link:hover {
      color: #0b6991;
      text-decoration: underline;
    }
    .separator {
      margin: 0 8px;
      color: #ccc;
    }
    .breadcrumb-current {
      color: #495057;
      font-weight: 500;
    }
  `]
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
}
