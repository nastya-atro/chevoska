import { CurrentUser } from '../core/models/user.model';

export interface AppState {
  root: RootState;
}

export interface RootState {
  user: CurrentUser | null;
  isInitialized: boolean;
  isLoading: boolean;
}

export const initialState: RootState = {
  user: null,
  isInitialized: false,
  isLoading: false,
};
