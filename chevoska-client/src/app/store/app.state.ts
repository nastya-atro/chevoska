import { CurrentUser } from '../core/models/user.model';

export interface AppState {
  root: RootState;
}

export interface RootState {
  user: CurrentUser;
  isInitialized: boolean;
  isLoading: boolean;
}

export const initialState: RootState = {
  user: {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
    avatar: '',
    enabled: true,
    role: '',
  },
  isInitialized: false,
  isLoading: false,
};
