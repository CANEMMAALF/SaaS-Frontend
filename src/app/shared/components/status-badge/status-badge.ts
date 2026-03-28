import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge" [ngClass]="type">
      <svg *ngIf="type === 'success'" width="12" height="12" viewBox="0 0 24 24" fill="none" class="badge-icon" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <svg *ngIf="type === 'danger'" width="12" height="12" viewBox="0 0 24 24" fill="none" class="badge-icon" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      <svg *ngIf="type === 'warning'" width="12" height="12" viewBox="0 0 24 24" fill="none" class="badge-icon" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      {{ text }}
    </span>
  `,
  styleUrl: './status-badge.css'
})
export class StatusBadgeComponent {
  @Input() type: 'success' | 'danger' | 'warning' = 'success';
  @Input() text: string = '';
}
