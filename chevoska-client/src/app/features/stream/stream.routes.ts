import { Routes } from '@angular/router';
import { AddNewStreamComponent } from './add-new-stream/addNewStream.component';
import { StreamResolver } from '../../core/resolvers/stream.resolver';
import { EditStreamComponent } from './pending-stream-editing/editStream.component';
import { StatisticStreamComponent } from './done-stream-statistic/statisticStream.component';

export const STREAM_ROUTES: Routes = [
  {
    path: 'new-stream',
    component: AddNewStreamComponent,
  },
  {
    path: 'edit/:id',
    resolve: { streamComponentData: StreamResolver },
    component: EditStreamComponent,
  },
  {
    path: 'statistic/:id',
    component: StatisticStreamComponent,
  },
];
