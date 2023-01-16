import { Routes } from '@angular/router';
import { StreamAuthLayoutComponent } from './stream-auth-layout.component';
import { ViewStreamAsResolverGuard } from '../../core/guards/view-stream-as-resolver.guard';
import { ViewStreamResolver } from '../../core/resolvers/view-stream.resolver';

export const STREAM_AUTH_LAYOUT_ROUTES: Routes = [
  {
    path: 'stream/:key',
    pathMatch: 'prefix',
    component: StreamAuthLayoutComponent,
    canActivate: [ViewStreamAsResolverGuard],
    resolve: { viewStreamComponentData: ViewStreamResolver },
    loadChildren: () => import('../../features/view-stream/viewStream.module').then(m => m.ViewStreamModule),
  },
];
