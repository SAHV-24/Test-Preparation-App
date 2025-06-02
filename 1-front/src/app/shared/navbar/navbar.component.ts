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
  templateUrl: './navbar.component.html',
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
