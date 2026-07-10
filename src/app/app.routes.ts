import { Routes } from '@angular/router';
import { authRoutes } from '@feature/auth';
import { sessionsRoutes } from '@feature/sessions';
import { vocabularyRoutes } from '@feature/vocabulary';

export const routes: Routes = [...authRoutes, ...sessionsRoutes, ...vocabularyRoutes];
