import { createAction, props } from '@ngrx/store';
import { CurrentUser } from '../core/models/user.model';

export const enum AppActionsTypes {
  UserFindProfileSuccess = '[SignIn] Find User Profile Success',
  StartAppInitializer = '[APP] Start App Initializer',
  ClearStoreData = '[APP] Clear Store Data',
}

export const startAppInitializer = createAction(AppActionsTypes.StartAppInitializer);

export const findUserProfileSuccess = createAction(
  AppActionsTypes.UserFindProfileSuccess,
  props<{ user: CurrentUser }>()
);

export const clearStoreData = createAction(AppActionsTypes.ClearStoreData);
