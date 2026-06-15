import { Routes } from '@angular/router';

export const sessionsRoutes: Routes = [
  { path: '', redirectTo: 'sessions', pathMatch: 'full' },
  {
    path: 'sessions',
    loadComponent: () => import('./sessions.component').then((c) => c.SessionsComponent),
    pathMatch: 'full',
  },
];
