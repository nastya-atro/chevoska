import { Routes } from '@angular/router';
import { StreamsComponent } from './streams.component';
import { AuthGuard } from '../../core/guards/auth.guard';

export const STREAMS_ROUTES: Routes = [
  {
    canActivate: [AuthGuard],
    path: 'streams',
    component: StreamsComponent,
  },
];
