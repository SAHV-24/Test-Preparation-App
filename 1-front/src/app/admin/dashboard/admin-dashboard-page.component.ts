import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardStats } from '../../interfaces/dashboard.interface';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-dashboard-page',
  templateUrl: './admin-dashboard-page.component.html',
  styleUrls: ['./admin-dashboard-page.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, MatIconModule]
})
export class AdminDashboardPageComponent implements OnInit {
  stats: DashboardStats | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  private loadStats(): void {
    this.dashboardService.getStats().subscribe({
      next: (data: DashboardStats) => {
        this.stats = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar las estadísticas';
        this.isLoading = false;
      }
    });
  }
}