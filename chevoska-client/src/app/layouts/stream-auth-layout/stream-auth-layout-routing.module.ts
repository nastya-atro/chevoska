import { Routes } from '@angular/router';
import { StreamAuthLayoutComponent } from './stream-auth-layout.component';
import { ViewStreamGuard } from '../../core/guards/view-stream.guard';

export const STREAM_AUTH_LAYOUT_ROUTES: Routes = [
  {
    path: 'stream/:key',
    pathMatch: 'prefix',
    component: StreamAuthLayoutComponent,
    canActivate: [ViewStreamGuard],
    loadChildren: () => import('../../features/view-stream/viewStream.module').then(m => m.ViewStreamModule),
  },
];
