import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'logement/:id',
    loadComponent: () =>
      import('./pages/property-detail/property-detail').then(
        (m) => m.PropertyDetailComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
