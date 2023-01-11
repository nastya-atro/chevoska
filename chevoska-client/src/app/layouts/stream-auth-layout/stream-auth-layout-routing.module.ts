import { Routes } from '@angular/router';
import { StreamAuthLayoutComponent } from './stream-auth-layout.component';

export const STREAM_AUTH_LAYOUT_ROUTES: Routes = [
  {
    path: 'stream/:key',
    pathMatch: 'prefix',
    // canActivate: [AuthAccessGuard],
    component: StreamAuthLayoutComponent,
    loadChildren: () => import('../../features/view-stream/viewStream.module').then(m => m.ViewStreamModule),
  },
];
