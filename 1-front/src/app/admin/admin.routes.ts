import { Routes } from '@angular/router';
import { adminOrColaboradorGuard, adminOnlyGuard } from './admin-role.guards';

export const adminRoutes: Routes = [
  {
    path: 'usuarios',
    canActivate: [adminOnlyGuard],
    loadComponent: () =>
      import('./usuarios/usuarios-page/usuarios-page.component').then(
        (m) => m.UsuariosPageComponent
      ),
  },
  {
    path: 'temas',
    canActivate: [adminOrColaboradorGuard],
    loadComponent: () =>
      import('./temas/temas-page/temas-page.component').then(
        (m) => m.TemasPageComponent
      ),
  },
  {
    path: 'preguntas',
    canActivate: [adminOrColaboradorGuard],
    loadComponent: () =>
      import('./preguntas/preguntas-page/preguntas-page.component').then(
        (m) => m.PreguntasPageComponent
      ),
  },
  {
    path: 'dashboard',
    canActivate: [adminOnlyGuard],
    loadComponent: () =>
      import('./dashboard/admin-dashboard-page.component').then(
        (m) => m.AdminDashboardPageComponent
      ),
  },
  { path: '', redirectTo: 'temas', pathMatch: 'full' },
];
