import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { CoreService } from '../../../services/core.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgxChartsModule, MatButtonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  estadisticas: any[] = [];
  trazabilidad: any[] = [];
  colorScheme = 'vivid'; // Usa un esquema predefinido de NgxCharts

  constructor(
    private localStorage: LocalStorageService,
    private core: CoreService
  ) {}

  ngOnInit() {
    this.localStorage.getDatos().subscribe(cache => {
      this.estadisticas = this.core.getEstadisticasPorPeriodoParaChart(
        cache.preguntas,
        cache.temas
      );
      // Trazabilidad para el gráfico de línea
      const rawTrazabilidad = this.core.getTrazabilidadUsuario();
      // Formatea la fecha a 'dd/MM/yyyy' para el gráfico
      this.trazabilidad = [
        {
          name: 'Trazabilidad',
          series: rawTrazabilidad.map(t => ({
            name: new Date(t.name).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            value: t.value
          }))
        }
      ];
    });
  }
}
