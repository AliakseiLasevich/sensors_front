import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthRequestInterface } from '../../core/models/auth.interfaces';
import { loginAction } from './auth.actions';
import { AuthState } from './auth.reducer';
import {
  selectAccessToken,
  selectError,
  selectIsLoading,
  selectIsLoggedIn,
} from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreFacade {
  loggedIn$: Observable<boolean> = this.store.select(selectIsLoggedIn);
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  accessToken$: Observable<string> = this.store.select(selectAccessToken);
  error: Observable<string | null> = this.store.select(selectError);

  constructor(private store: Store<AuthState>) {}

  login(userData: AuthRequestInterface) {
    this.store.dispatch(loginAction({ userData }));
  }
}
