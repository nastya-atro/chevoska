import { Routes } from '@angular/router';
import { EnterSystemComponent } from './enter-system/enterSystem.component';
import { ActiveStreamComponent } from './active-stream/activeStream.component';
import { ReviewComponent } from './review-after-stream/review.component';
import { ClientAccessGuard } from '../../core/guards/client-access.guard';
import { ClientActiveSessionGuard } from '../../core/guards/clientActiveSession.guard';

export const VIEW_STREAM_ROUTES: Routes = [
  {
    path: '',
    component: EnterSystemComponent,
    canActivate: [ClientAccessGuard],
  },
  {
    path: 'active',
    component: ActiveStreamComponent,
    canActivate: [ClientActiveSessionGuard],
  },
  {
    path: 'review',
    component: ReviewComponent,
  },
];
