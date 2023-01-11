import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule),
  },
  {
    path: '',
    loadChildren: () => import('./layouts/main-layout/main-layout.module').then(m => m.MainLayoutModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./layouts/stream-auth-layout/stream-auth-layout.module').then(m => m.StreamAuthLayoutModule),
  },
  { path: '**', redirectTo: '404' },
  { path: '404', pathMatch: 'full', component: PageNotFoundComponent },
];
