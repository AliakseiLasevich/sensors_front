import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state: AuthState) => state.loggedIn
);

export const selectAccessToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.accessToken
);

export const selectError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);
