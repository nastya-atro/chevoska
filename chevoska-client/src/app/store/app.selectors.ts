import { createSelector } from '@ngrx/store';
import { AppState, RootState } from './app.state';
import { CurrentUser } from '../core/models/user.model';
import { CurrentClient } from '../core/models/client.model';
import { ViewStream } from '../core/models/streams/view-stream.model';

export const selectRoot = (state: AppState): RootState => state.root;

export const selectUser = createSelector<AppState, RootState, CurrentUser | null>(
  selectRoot,
  (state: RootState) => state.user
);

export const selectClient = createSelector<AppState, RootState, CurrentClient | null>(
  selectRoot,
  (state: RootState) => state.client
);

export const selectViewStream = createSelector<AppState, RootState, ViewStream | null>(
  selectRoot,
  (state: RootState) => state.viewStream
);
