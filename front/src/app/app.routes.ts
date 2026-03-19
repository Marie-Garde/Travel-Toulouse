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
    path: 'inscription',
    loadComponent: () =>
      import('./pages/register/register').then((m) => m.RegisterComponent),
  },
  {
    path: 'connexion',
    loadComponent: () =>
      import('./pages/login/login').then((m) => m.LoginComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
