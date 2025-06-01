// Servicio base genérico para operaciones CRUD estándar en Angular
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

export abstract class CRUDService<T> {
  protected abstract baseUrl: string;

  constructor(protected http: HttpClient) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${environment.API_URL}${this.baseUrl}`);
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${environment.API_URL}${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<T> {
    return this.http.post<T>(`${environment.API_URL}${this.baseUrl}`, data);
  }

  update(id: string, data: any): Observable<T> {
    return this.http.put<T>(`${environment.API_URL}${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.API_URL}${this.baseUrl}/${id}`);
  }
}
