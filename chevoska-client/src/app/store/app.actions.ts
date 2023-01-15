import { createAction, props } from '@ngrx/store';
import { CurrentUser } from '../core/models/user.model';

export const enum AppActionsTypes {
  UserFindProfileSuccess = '[SignIn] Find User Profile Success',
}

export const findUserProfileSuccess = createAction(
  AppActionsTypes.UserFindProfileSuccess,
  props<{ user: CurrentUser }>()
);
