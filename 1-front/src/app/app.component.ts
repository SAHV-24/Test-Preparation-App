import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from './services/auth.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSlideToggleModule,
    MatSidenavModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    NavbarComponent,
    MatListModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'project';
  isDesktop = true;
  drawerOpened = true;
  navItems = [
    { label: 'Temas y Presentaciones', link: '/temas' },
    { label: 'Preguntas', link: '/preguntas' },
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe((result) => {
        this.isDesktop = result.matches;
        this.drawerOpened = this.isDesktop;
      });
  }

  get isAdminOrColaborador(): boolean {
    return this.authService.isAdminOrColaborador();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isActive(link: string): boolean {
    return this.router.isActive(link, { paths: 'exact', queryParams: 'ignored', fragment: 'ignored', matrixParams: 'ignored' });
  }

  get sidenavItems() {
    const items = [
      ...(this.isAdmin
        ? [{ label: 'Gestionar Usuarios', link: '/admin/usuarios', color: 'primary' }]
        : []),
      { label: 'Gestionar Temas', link: '/admin/temas' },
      { label: 'Gestionar Presentaciones', link: '/admin/presentaciones' },
      { label: 'Gestionar Preguntas', link: '/admin/preguntas' },
    ];
    return items;
  }
}
