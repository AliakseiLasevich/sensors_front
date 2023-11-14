import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { map, take, tap } from 'rxjs';
import { AuthStoreFacade } from 'src/app/store/auth-store/auth-store.facade';

export function authorizedGuard(): CanMatchFn {
  return () => {
    const authService = inject(AuthStoreFacade);
    const router: Router = inject(Router);
    return authService.loggedIn$.pipe(
      take(1),
      tap((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          return true;
        } else {
          return router.navigateByUrl('/login');
        }
      })
    );
  };
}

export function notAuthorizedGuard(): CanActivateFn {
  return () => {
    const authService = inject(AuthStoreFacade);
    return authService.loggedIn$.pipe(
      take(1),
      map((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          return true;
        } else {
          return false;
        }
      })
    );
  };
}
