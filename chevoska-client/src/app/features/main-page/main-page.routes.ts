import { Routes } from '@angular/router';
import { MainStreamsListComponent } from './main-streams-list/main-streams-list..component';
import { MainStreamDetailComponent } from './main-stream-detail/main-stream-detail.component';
import { StreamDetailResolver } from '../../core/resolvers/stream-detail.resolver';

export const MAIN_PAGE_ROUTES: Routes = [
  {
    path: 'main',
    component: MainStreamsListComponent,
  },
  {
    path: 'detail/:id',
    resolve: { streamComponentData: StreamDetailResolver },
    component: MainStreamDetailComponent,
  },
];
