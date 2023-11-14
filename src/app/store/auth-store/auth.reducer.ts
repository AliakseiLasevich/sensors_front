import { createReducer, on } from '@ngrx/store';
import { loginAction, loginFailure, loginSuccess } from './auth.actions';

export interface AuthState {
  loggedIn: boolean;
  loading: boolean;
  accessToken: string;
  error: string | null;
}

const initialState: AuthState = {
  loggedIn: false,
  loading: false,
  accessToken: '',
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginAction, (state) => ({ ...state, loading: true, error: null })),
  on(loginSuccess, (state, payload) => ({
    ...state,
    loading: false,
    loggedIn: true,
    accessToken: payload.access_token.token,
  })),
  on(loginFailure, (state, payload) => ({ ...state, error: payload.error }))
);
