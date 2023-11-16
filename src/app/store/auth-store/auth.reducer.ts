import { createReducer, on } from '@ngrx/store';
import {
  loginAction,
  loginFailure,
  loginSuccess,
  logoutAction,
  logoutFailure,
  logoutSuccess,
} from './auth.actions';

export interface AuthState {
  loggedIn: boolean;
  loading: boolean;
  accessToken: string | null;
  error: string | null;
  userRoles: string[];
}

const initialState: AuthState = {
  loggedIn: false,
  loading: false,
  accessToken: null,
  error: null,
  userRoles: [],
};

export const authReducer = createReducer(
  initialState,
  on(loginAction, (state) => ({ ...state, loading: true, error: null })),
  on(loginSuccess, (state, payload) => ({
    ...state,
    loading: false,
    loggedIn: true,
    accessToken: payload.access_token.token,
    userRoles: payload.roles,
  })),
  on(loginFailure, (state, payload) => ({ ...state, error: payload.error })),

  on(logoutAction, (state) => ({ ...state, loading: true, error: null })),
  on(logoutSuccess, (state) => ({
    ...state,
    loading: false,
    loggedIn: false,
    accessToken: null,
    userRoles: [],
  })),
  on(logoutFailure, (state, payload) => ({ ...state, error: payload.error }))
);
