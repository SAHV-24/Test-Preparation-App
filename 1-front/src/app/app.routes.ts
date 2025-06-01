import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./admin/admin.routes').then((m) => m.adminRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/modules.routes').then((m) => m.modulesRoutes),
  },
  { path: '**', redirectTo: '' },
];
