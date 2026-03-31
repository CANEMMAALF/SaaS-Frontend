import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss'
})
export class StatCardComponent {
  // Inputs exigentes para garantizar la estructura Premium
  @Input() title: string = 'Métrica';
  @Input() value: string | number = '0';
  @Input() icon: string = 'analytics';
  @Input() trend?: { value: number, isPositive: boolean }; // Extension para subir de nivel
}

