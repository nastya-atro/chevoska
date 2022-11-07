import { Routes } from '@angular/router';
import { EditStreamComponent } from './editStream.component';

export const EDIT_STREAM_ROUTES: Routes = [
  {
    path: 'edit/:id',
    component: EditStreamComponent,
  },
];
