import { Routes } from '@angular/router';
import { EnterSystemComponent } from './enter-system/enterSystem.component';
import { ActiveStreamComponent } from './active-stream/activeStream.component';
import { ReviewComponent } from './review-after-stream/review.component';

export const VIEW_STREAM_ROUTES: Routes = [
  {
    path: 'enter',
    component: EnterSystemComponent,
  },
  {
    path: 'active',
    component: ActiveStreamComponent,
  },
  {
    path: 'review',
    component: ReviewComponent,
  },
];
