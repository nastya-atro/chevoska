import { CurrentUser } from '../core/models/user.model';
import { CurrentClient } from '../core/models/client.model';
import { ViewStream } from '../core/models/view-stream.model';

export interface AppState {
  root: RootState;
}

export interface RootState {
  user: CurrentUser | null;
  client: CurrentClient | null;
  viewStream: ViewStream | null;
  // isInitialized: boolean;
  // isLoading: boolean;
}

export const initialState: RootState = {
  user: null,
  client: null,
  viewStream: null,
  // isInitialized: false,
  // isLoading: false,
};
