import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  { path: 'login', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'register', redirectTo: 'auth/register', pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: () => import('./components/auth-layout/auth-layout.component').then((c) => c.AuthLayoutComponent),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('./register/register.component').then((c) => c.RegisterComponent),
      },
    ],
  },
];
