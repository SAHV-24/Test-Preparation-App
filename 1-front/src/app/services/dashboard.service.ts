import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardColaboradores, DashboardTemas, DashboardPreguntas, DashboardRespuestas } from '../interfaces/dashboard.interface';
import { environment } from '../environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  getTotalColaboradores(): Observable<DashboardColaboradores> {
    return this.http.get<DashboardColaboradores>(`${environment.API_URL}/api/dashboard/usuarios/colaboradores/count`);
  }

  getTotalTemas(): Observable<DashboardTemas> {
    return this.http.get<DashboardTemas>(`${environment.API_URL}/api/dashboard/temas/count`);
  }

  getTotalPreguntas(): Observable<DashboardPreguntas> {
    return this.http.get<DashboardPreguntas>(`${environment.API_URL}/api/dashboard/preguntas/count`);
  }

  getTotalRespuestas(): Observable<DashboardRespuestas> {
    return this.http.get<DashboardRespuestas>(`${environment.API_URL}/api/dashboard/respuestas/count`);
  }
}
