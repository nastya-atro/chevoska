import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
  },
  { path: '**', redirectTo: '404' },
  // { path: '404', pathMatch: 'full', component: PageNotFoundComponent },
];
