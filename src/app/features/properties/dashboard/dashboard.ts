import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService, PropertyStat, PropertyNode } from '../../../core/services/mock-data/mock-data.service';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent, StatusBadgeComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  stats$!: Observable<PropertyStat[]>;
  properties$!: Observable<PropertyNode[]>;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.stats$ = this.mockDataService.getDashboardStats();
    this.properties$ = this.mockDataService.getProperties();
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
  }
}
