import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentStatus } from '../../../core/models/payment-status.enum';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss'
})
export class StatusBadgeComponent {
  @Input() status!: PaymentStatus;
  public PaymentStatusEnum = PaymentStatus;
}

