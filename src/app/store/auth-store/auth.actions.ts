import { createAction, props } from '@ngrx/store';
import {
  AuthRequestInterface,
  AuthResponseInterface,
} from '../../core/models/auth.interfaces';
import { ActionTypes } from './auth.actionTypes';

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ userData: AuthRequestInterface }>()
);

export const loginSuccess = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<AuthResponseInterface>()
);

export const loginFailure = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ error: string }>()
);

export const logoutAction = createAction(ActionTypes.LOGOUT);

export const logoutSuccess = createAction(ActionTypes.LOGOUT_SUCCESS);

export const logoutFailure = createAction(ActionTypes.LOGOUT_FAILURE,
  props<{ error: string }>());
