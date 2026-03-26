import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stat-card" [ngClass]="colorClass">
      <div class="icon-wrapper">
        <svg *ngIf="icon === 'home'" viewBox="0 0 24 24" fill="none" class="stat-icon"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        <svg *ngIf="icon === 'people'" viewBox="0 0 24 24" fill="none" class="stat-icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"></path><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" stroke-width="2"></path><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="2"></path></svg>
        <svg *ngIf="icon === 'receipt'" viewBox="0 0 24 24" fill="none" class="stat-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2"></path><polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="2"></polyline><line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2"></line><line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2"></line><polyline points="10 9 9 9 8 9" stroke="currentColor" stroke-width="2"></polyline></svg>
        <svg *ngIf="icon === 'alert'" viewBox="0 0 24 24" fill="none" class="stat-icon"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"></circle><line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"></line><line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"></line></svg>
      </div>
      <div class="stat-value">{{ value }}</div>
      <div class="stat-title">{{ title }}</div>
      <div class="stat-footer" *ngIf="trend">
        <span class="trend" [class.positive]="trend.startsWith('+')" [class.negative]="trend.startsWith('-')">
          <svg *ngIf="trend.startsWith('+')" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
          <svg *ngIf="trend.startsWith('-')" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline><polyline points="16 17 22 17 22 11"></polyline></svg>
          {{ trend }}
        </span>
      </div>
    </div>
  `,
  styleUrl: './stat-card.css'
})
export class StatCardComponent {
  @Input() title!: string;
  @Input() value!: string;
  @Input() icon!: string;
  @Input() trend?: string;
  @Input() colorClass: string = 'blue';
}
