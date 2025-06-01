import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from './crud.service';
import { Observable } from 'rxjs';
import { Pregunta } from '../interfaces/pregunta.interface';
import { PreguntaAleatoriaPublica } from '../interfaces/pregunta-aleatoria-publica.interface';
import { environment } from '../environment';

@Injectable({ providedIn: 'root' })
export class PreguntaService extends CRUDService<Pregunta> {
  protected baseUrl = '/api/preguntas';
  constructor(protected override http: HttpClient) {
    super(http);
  }

  // Sobrescribe create para soportar FormData (imágenes)
  override create(data: FormData | Partial<Pregunta>): Observable<Pregunta> {
    return this.http.post<Pregunta>(`${environment.API_URL}${this.baseUrl}`, data instanceof FormData ? data : { ...data });
  }

  // Sobrescribe update para soportar FormData (imágenes)
  override update(id: string, data: FormData | Partial<Pregunta>): Observable<Pregunta> {
    return this.http.put<Pregunta>(`${environment.API_URL}${this.baseUrl}/${id}`, data instanceof FormData ? data : { ...data });
  }

  // Endpoint especial: obtener pregunta aleatoria pública
  getRandomPreguntaPublic(idTema: string, excludeIds: string[] = []): Observable<PreguntaAleatoriaPublica[]> {
    let url = `${environment.API_URL}${this.baseUrl}/public/random/${idTema}`;
    if (excludeIds.length > 0) {
      url += `?exclude=${excludeIds.join(',')}`;
    }
    return this.http.get<PreguntaAleatoriaPublica[]>(url);
  }
}
