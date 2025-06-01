import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from './crud.service';
import { Observable } from 'rxjs';
import { Tema } from '../interfaces/tema.interface';

@Injectable({ providedIn: 'root' })
export class TemaService extends CRUDService<Tema> {
  protected baseUrl = '/api/temas';
  constructor(protected override http: HttpClient) {
    super(http);
  }

  // Sobrescribe create para soportar FormData (imágenes)
  override create(data: FormData | Partial<Tema>): Observable<Tema> {
    return this.http.post<Tema>(`${this.baseUrl.startsWith('http') ? this.baseUrl : ''}${this.baseUrl}`, data instanceof FormData ? data : { ...data });
  }

  // Sobrescribe update para soportar FormData (imágenes)
  override update(id: string, data: FormData | Partial<Tema>): Observable<Tema> {
    return this.http.put<Tema>(`${this.baseUrl.startsWith('http') ? this.baseUrl : ''}${this.baseUrl}/${id}`, data instanceof FormData ? data : { ...data });
  }
}
