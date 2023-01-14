import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileResolver } from '../../core/resolvers/profile.resolver';

export const PROFILE_ROUTES: Routes = [
  {
    path: 'profile',
    resolve: { profileComponentData: ProfileResolver },
    component: ProfileComponent,
  },
];
