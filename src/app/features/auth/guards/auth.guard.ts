import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthStoreFacade } from 'src/app/store/auth-store/auth-store.facade';

export function authorizedGuard(): CanMatchFn {
  return () => {
    const authorized = inject(AuthStoreFacade).authorized;
    const router: Router = inject(Router);
    return authorized || router.createUrlTree(['/login']);
  };
}

export function notAuthorizedGuard(): CanActivateFn {
  return () => {
    const authorized = inject(AuthStoreFacade).authorized;
    const router: Router = inject(Router);
    return !authorized || router.createUrlTree(['/sensors']);
  };
}
