import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from './crud.service';
import { Observable } from 'rxjs';
import { Respuesta } from '../interfaces/respuesta.interface';
import { environment } from '../environment';

@Injectable({ providedIn: 'root' })
export class RespuestaService extends CRUDService<Respuesta> {
  protected baseUrl = '/api/respuestas';
  constructor(protected override http: HttpClient) {
    super(http);
  }

  // Sobrescribe create para soportar FormData (imágenes)
  override create(data: FormData | Partial<Respuesta>): Observable<Respuesta> {
    return this.http.post<Respuesta>(`${environment.API_URL}${this.baseUrl}`, data instanceof FormData ? data : { ...data });
  }

  // Sobrescribe update para soportar FormData (imágenes)
  override update(id: string, data: FormData | Partial<Respuesta>): Observable<Respuesta> {
    return this.http.put<Respuesta>(`${environment.API_URL}${this.baseUrl}/${id}`, data instanceof FormData ? data : { ...data });
  }

  // Obtener respuestas por pregunta
  getByPregunta(idPregunta: string): Observable<Respuesta[]> {
    return this.http.get<Respuesta[]>(`${environment.API_URL}${this.baseUrl}/pregunta/${idPregunta}`);
  }

  // Obtener todas las respuestas públicas
  getAllPublic(): Observable<Respuesta[]> {
    return this.http.get<Respuesta[]>(`${environment.API_URL}/api/public/respuestas`);
  }
}
