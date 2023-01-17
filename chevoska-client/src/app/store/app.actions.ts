import { createAction, props } from '@ngrx/store';
import { CurrentUser } from '../core/models/user.model';
import { CurrentClient } from '../core/models/client.model';
import { ViewStream } from '../core/models/streams/view-stream.model';

export const enum AppActionsTypes {
  UserFindProfileSuccess = '[UserSession] Find User Session Success',
  ClientViewStreamFindSuccess = '[UserSession] Find Client Session Success',
  ViewStreamFindSuccess = '[ViewStream] Find current ViewStream Success',
  ClearStoreData = '[APP] Clear Store Data',
}

export const findUserProfileSuccess = createAction(
  AppActionsTypes.UserFindProfileSuccess,
  props<{ user: CurrentUser }>()
);

export const findClientViewStreamSuccess = createAction(
  AppActionsTypes.ClientViewStreamFindSuccess,
  props<{ client: CurrentClient | null }>()
);

export const findViewStreamSuccess = createAction(
  AppActionsTypes.ViewStreamFindSuccess,
  props<{ viewStream: ViewStream | null }>()
);

export const clearStoreData = createAction(AppActionsTypes.ClearStoreData);
