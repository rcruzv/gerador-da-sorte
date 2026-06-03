import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGateway } from './auth.gateway';

export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthGateway);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/auth/login'], {
    queryParams: { returnUrl: state.url },
  });
};

