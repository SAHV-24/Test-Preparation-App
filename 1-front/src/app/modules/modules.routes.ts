import { Routes } from '@angular/router';

export const modulesRoutes: Routes = [
  { path: 'usuarios', loadComponent: () => import('./usuarios/usuarios-page/usuarios-page.component').then(m => m.UsuariosPageComponent) },
  { path: 'temas', loadComponent: () => import('./temas/temas-page/temas-page.component').then(m => m.TemasPageComponent) },
  { path: 'presentaciones', loadComponent: () => import('./presentaciones/presentaciones-page/presentaciones-page.component').then(m => m.PresentacionesPageComponent) },
  { path: 'preguntas', loadComponent: () => import('./preguntas/preguntas-page/preguntas-page.component').then(m => m.PreguntasPageComponent) },
  { path: 'preguntas/:temaId', loadComponent: () => import('./preguntas/preguntas-by-tema-page/preguntas-by-tema-page.component').then(m => m.PreguntasByTemaPageComponent) },
  { path: '', redirectTo: 'temas', pathMatch: 'full' }
];
