import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    MatSlideToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
  ],
  template: `
    <mat-toolbar color="primary" class="navbar">
      <button
        mat-icon-button
        (click)="drawer?.toggle()"
        *ngIf="authService.isAdminOrColaborador() && authService.isLoggedIn()"
      >
        <mat-icon>menu</mat-icon>
      </button>

      <span class="navbar-title special-title">FyEvP</span>

      <span class="spacer"></span>

      <div class="nav-buttons-container">
        <ng-container *ngIf="!isMobile">
          <button
            *ngFor="let item of navItems"
            mat-button
            [routerLink]="item.link"
            routerLinkActive="active"
          >
            {{ item.label }}
          </button>
          <button
            *ngIf="!authService.isLoggedIn()"
            mat-raised-button
            color="accent"
            routerLink="/login"
          >
            Login
          </button>
          <button
            *ngIf="authService.isLoggedIn()"
            mat-raised-button
            color="warn"
            (click)="logout()"
          >
            Cerrar sesión
          </button>
        </ng-container>

        <ng-container *ngIf="isMobile">
          <button
            *ngFor="let item of navItems"
            mat-icon-button
            [routerLink]="item.link"
            routerLinkActive="active"
            [matTooltip]="item.label"
          >
            <mat-icon>{{ getIcon(item.label) }}</mat-icon>
          </button>
          <button
            *ngIf="!authService.isLoggedIn()"
            mat-icon-button
            routerLink="/login"
            matTooltip="Login"
          >
            <mat-icon>login</mat-icon>
          </button>
          <button
            *ngIf="authService.isLoggedIn()"
            mat-icon-button
            (click)="logout()"
            matTooltip="Cerrar sesión"
          >
            <mat-icon>logout</mat-icon>
          </button>
        </ng-container>
      </div>
    </mat-toolbar>
  `,
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() drawer: any;
  @Input() showToggle = false;
  @Input() navItems: { label: string; link: string }[] = [];

  isMobile = false;

  constructor(public authService: AuthService, private router: Router) {
    this.checkMobile();
    window.addEventListener('resize', () => this.checkMobile());
  }

  checkMobile() {
    this.isMobile = window.innerWidth < 600;
  }

  getIcon(label: string): string {
    switch (label.toLowerCase()) {
      case 'temas y presentaciones':
      case 'gestionar temas':
        return 'menu_book';
      case 'preguntas':
      case 'gestionar preguntas':
        return 'quiz';
      case 'gestionar usuarios':
        return 'group';
      case 'gestionar presentaciones':
        return 'slideshow';
      default:
        return 'apps';
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
