import { Routes } from '@angular/router';
import { ActiveStreamComponent } from './activeStream.component';

export const ACTIVE_STREAM_ROUTES: Routes = [
  {
    path: 'stream/:id',
    component: ActiveStreamComponent,
  },
];
