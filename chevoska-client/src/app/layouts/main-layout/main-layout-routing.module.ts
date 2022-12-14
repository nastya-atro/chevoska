import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { AuthGuard } from '../../core/guards/auth.guard';

export const MAIN_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../features/add-new-stream/addNewStream.module').then(m => {
            return m.AddNewStreamModule;
          }),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../features/stream/done-stream-statistic/statisticStream.module').then(m => {
            return m.StatisticStreamModule;
          }),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../features/stream/pending-stream-editing/editStream.module').then(m => {
            return m.EditStreamModule;
          }),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../features/profile/profile.module').then(m => {
            return m.ProfileModule;
          }),
      },

      {
        path: '',
        loadChildren: () =>
          import('../../features/streams-list/streams.module').then(m => {
            return m.StreamsModule;
          }),
      },
    ],
  },
];
