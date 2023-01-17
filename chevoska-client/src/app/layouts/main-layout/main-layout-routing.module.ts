import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { AuthGuard } from '../../core/guards/auth.guard';

export const MAIN_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../features/main-page/main-page.module').then(m => {
            return m.MainPageModule;
          }),
      },
      {
        canActivate: [AuthGuard],
        path: '',
        loadChildren: () =>
          import('../../features/stream/stream.module').then(m => {
            return m.StreamModule;
          }),
      },
      {
        canActivate: [AuthGuard],
        path: '',
        loadChildren: () =>
          import('../../features/profile/profile.module').then(m => {
            return m.ProfileModule;
          }),
      },

      {
        canActivate: [AuthGuard],
        path: '',
        loadChildren: () =>
          import('../../features/streams-list/streams.module').then(m => {
            return m.StreamsModule;
          }),
      },
    ],
  },
];
