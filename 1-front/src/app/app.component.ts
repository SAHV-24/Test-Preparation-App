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
import { MatLabel } from '@angular/material/form-field';
import { Usuario } from './interfaces/usuario.interface';
import { UsuarioAuth } from './interfaces/usuario-auth.interface';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSlideToggleModule,
    MatSidenavModule,
    MatLabel,
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
  user: UsuarioAuth | null = null;
  cacheDatos: any = null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService // inyectar el servicio
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe((result) => {
        this.isDesktop = result.matches;
        this.drawerOpened = this.isDesktop;
      });

    this.user = this.authService.getUser();

    // Si NO está autenticado, obtener datos cacheados
    if (!this.authService.isLoggedIn()) {
      console.log('No autenticado, obteniendo datos cacheados');

      this.localStorageService.getDatos().subscribe((cache) => {
        this.cacheDatos = cache;
      });
    }
  }

  get isAdminOrColaborador(): boolean {
    return this.authService.isAdminOrColaborador();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isActive(link: string): boolean {
    return this.router.isActive(link, {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  get sidenavItems() {
    const items = [
      ...(this.isAdmin
        ? [
        
          { label: 'Dashboard', link: '/admin/dashboard',  },
            { label: 'Usuarios', link: '/admin/usuarios', color: 'secondary' },
          ]
        : []),
      { label: 'Temas', link: '/admin/temas' },
      { label: 'Preguntas', link: '/admin/preguntas' },
    ];
    return items;
  }
}
