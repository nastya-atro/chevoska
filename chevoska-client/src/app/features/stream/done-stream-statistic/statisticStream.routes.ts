import { Routes } from '@angular/router';
import { StatisticStreamComponent } from './statisticStream.component';

export const STATISTIC_STREAM_ROUTES: Routes = [
  {
    path: 'statistic/:id',
    component: StatisticStreamComponent,
  },
];
