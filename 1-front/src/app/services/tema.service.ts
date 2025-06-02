import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from './crud.service';
import { Observable } from 'rxjs';
import { Tema } from '../interfaces/tema.interface';
import { environment } from '../environment';

@Injectable({ providedIn: 'root' })
export class TemaService extends CRUDService<Tema> {
  protected baseUrl = '/api/temas';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  override create(data: FormData | Partial<Tema>): Observable<Tema> {
    return this.http.post<Tema>(
      `${environment.API_URL}${this.baseUrl}`,
      data instanceof FormData ? data : { ...data }
    );
  }

  override update(
    id: string,
    data: FormData | Partial<Tema>
  ): Observable<Tema> {
    return this.http.put<Tema>(
      `${environment.API_URL}${this.baseUrl}/${id}`,
      data instanceof FormData ? data : { ...data }
    );
  }

  getAllPublic(): Observable<Tema[]> {
    return this.http.get<Tema[]>(`${environment.API_URL}/api/public/temas`);
  }
}
