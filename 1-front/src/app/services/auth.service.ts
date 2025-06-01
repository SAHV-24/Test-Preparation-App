import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { UsuarioAuth } from '../interfaces/usuario-auth.interface';
import { environment } from '../environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(nombreUsuario: string, contrasena: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.API_URL}/api/auth/login`, { nombreUsuario, contrasena });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  saveUser(user: UsuarioAuth): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): UsuarioAuth | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const user = this.getUser();
    return user ? user.rol : null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }

  isAdminOrColaborador(): boolean {
    const role = this.getUserRole();
    return role === 'Admin' || role === 'Colaborador';
  }

  logout(): void {
    this.removeToken();
    localStorage.removeItem('user');
  }
}
