import { createReducer, on } from '@ngrx/store';
import * as appActions from './app.actions';
import { initialState } from './app.state';

export const rootReducer = createReducer(
  initialState,
  on(appActions.findUserProfileSuccess, (state, { user }) => {
    return { ...state, user: { ...user } }; // merge params
  }),
  on(appActions.findClientViewStreamSuccess, (state, { client }) => {
    return { ...state, client: client ? { ...client } : null }; // merge params
  }),
  on(appActions.findViewStreamSuccess, (state, { viewStream }) => {
    return { ...state, viewStream: viewStream ? { ...viewStream } : null }; // merge params
  }),
  on(appActions.clearStoreData, () => ({ ...initialState }))
);
