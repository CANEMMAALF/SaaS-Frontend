import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buttons.html',
  styleUrl: './buttons.scss'
})
export class ButtonComponent {
  // Inputs Dinámicos para Design System
  @Input() color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' = 'primary';
  @Input() variant: 'solid' | 'outline' | 'ghost' = 'solid';
  @Input() disabled: boolean = false;

  // Computa las clases reactivamente
  get buttonClasses(): string {
    return `btn btn-${this.color} btn-${this.variant}`;
  }
}

