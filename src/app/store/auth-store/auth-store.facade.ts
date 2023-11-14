import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
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
export class AuthStoreFacade implements OnInit, OnDestroy {
  authorized: boolean = false;
  loggedIn$: Observable<boolean> = this.store.select(selectIsLoggedIn);
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  accessToken$: Observable<string> = this.store.select(selectAccessToken);
  error: Observable<string | null> = this.store.select(selectError);

  subscriptions: Subscription[] = [];

  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    const loggedSubscription = this.loggedIn$.subscribe(
      (loggedIn) => (this.authorized = loggedIn)
    );
    this.subscriptions.push(loggedSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  login(userData: AuthRequestInterface) {
    this.store.dispatch(loginAction({ userData }));
  }
}
