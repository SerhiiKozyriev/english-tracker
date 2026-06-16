import { Routes } from '@angular/router';

export const vocabularyRoutes: Routes = [
  {
    path: 'vocabulary',
    loadComponent: () => import('./vocabulary.component').then((c) => c.VocabularyComponent),
    pathMatch: 'full',
  },
];
