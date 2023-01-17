import { Routes } from '@angular/router';
import { AddNewStreamComponent } from './add-new-stream/addNewStream.component';
import { StreamEditResolver } from '../../core/resolvers/stream-edit.resolver';
import { EditStreamComponent } from './pending-stream-editing/editStream.component';
import { StatisticStreamComponent } from './done-stream-statistic/statisticStream.component';
import { AuthGuard } from '../../core/guards/auth.guard';

export const STREAM_ROUTES: Routes = [
  {
    path: 'new-stream',
    component: AddNewStreamComponent,
  },
  {
    path: 'edit/:id',
    resolve: { streamComponentData: StreamEditResolver },
    component: EditStreamComponent,
  },
  {
    path: 'statistic/:id',
    component: StatisticStreamComponent,
  },
];
