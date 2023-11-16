import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponseInterface } from '../../core/models/auth.interfaces';
import { PersistanceService } from '../../services/persistance-service/persistance.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth-services/auth.service';
import { ActionTypes } from './auth.actionTypes';
import {
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutSuccess,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}

  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.LOGIN),
      switchMap(({ userData }) => {
        return this.authService.authenticate(userData).pipe(
          map((response: AuthResponseInterface) =>
            loginSuccess({
              access_token: response.access_token,
              roles: this.authService.extractRolesFromToken(response.access_token.token)
            })
          ),
          catchError((error) => {
            return of(loginFailure(error));
          })
        );
      })
    )
  );

  logoutEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.LOGOUT),
      switchMap(() => {
        return this.authService.logout().pipe(
          map(() => {
            return logoutSuccess();
          }),
          catchError(({ error }) => {
            return of(logoutFailure(error));
          })
        );
      })
    )
  );

  logoutSuccessfulEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionTypes.LOGOUT_SUCCESS),
        tap(() => {
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );

  storeTokenInLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionTypes.LOGIN_SUCCESS),
        tap((response: AuthResponseInterface) => {
          this.persistanceService.storeToken(response);
          this.router.navigateByUrl('/sensors');
        })
      ),
    { dispatch: false }
  );

}
