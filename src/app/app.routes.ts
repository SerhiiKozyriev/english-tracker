import { Routes } from '@angular/router';
import { sessionsRoutes } from '@feature/sessions';
import { vocabularyRoutes } from '@feature/vocabulary';

export const routes: Routes = [
  ...sessionsRoutes,
  ...vocabularyRoutes,
];
