import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthRequestInterface } from '../../core/models/auth.interfaces';
import { loginAction, logoutAction } from './auth.actions';
import { AuthState } from './auth.reducer';
import {
  selectAccessToken,
  selectError,
  selectIsLoading,
  selectIsLoggedIn,
  selectRoles,
} from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreFacade {
  loggedIn$: Observable<boolean> = this.store.select(selectIsLoggedIn);
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  accessToken$: Observable<string | null> =
    this.store.select(selectAccessToken);
  error: Observable<string | null> = this.store.select(selectError);
  userRoles$: Observable<string[]> = this.store.select(selectRoles);

  constructor(private store: Store<AuthState>) {}

  login(userData: AuthRequestInterface) {
    this.store.dispatch(loginAction({ userData }));
  }

  logout() {
    this.store.dispatch(logoutAction());
  }
}
