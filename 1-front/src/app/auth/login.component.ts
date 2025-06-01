import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="login-wrapper">
      <mat-card class="login-card">
        <h2 mat-card-title>Iniciar Sesión</h2>
        <form (ngSubmit)="login()" #loginForm="ngForm" autocomplete="off">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Usuario</mat-label>
            <input
              matInput
              type="text"
              [(ngModel)]="nombreUsuario"
              name="nombreUsuario"
              required
              autocomplete="username"
            />
          </mat-form-field>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Contraseña</mat-label>
            <input
              matInput
              type="password"
              [(ngModel)]="contrasena"
              name="contrasena"
              required
              autocomplete="current-password"
            />
          </mat-form-field>
          <button
            mat-raised-button
            color="primary"
            class="full-width"
            type="submit"
            [disabled]="loading"
          >
            <ng-container *ngIf="!loading">Entrar</ng-container>
            <mat-progress-spinner
              *ngIf="loading"
              diameter="20"
              mode="indeterminate"
            ></mat-progress-spinner>
          </button>
          <div *ngIf="error" class="error">{{ error }}</div>
        </form>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .login-wrapper {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f6fa;
      }
      .login-card {
        width: 100%;
        max-width: 350px;
        padding: 2rem 1.5rem 1.5rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 24px #0002;
      }
      .full-width {
        width: 100%;
      }
      button.full-width {
        margin-top: 1.2rem;
        height: 40px;
      }
      .error {
        color: #d32f2f;
        margin-top: 1.2rem;
        text-align: center;
        font-size: 0.98rem;
      }
      mat-card-title,
      h2 {
        text-align: center;
        margin-bottom: 1.5rem;
        font-weight: 600;
      }
    `,
  ],
})
export class LoginComponent {
  nombreUsuario = '';
  contrasena = '';
  loading = false;
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.loading = true;
    this.error = null;
    this.auth.login(this.nombreUsuario, this.contrasena).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);
        this.auth.saveUser(res.usuario);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Credenciales incorrectas';
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }
}
