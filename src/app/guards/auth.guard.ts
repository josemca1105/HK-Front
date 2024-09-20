import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().then(isAuth => {
    console.log('AuthGuard: Is authenticated?', isAuth);
    if (isAuth) {
      return true;
    } else {
      console.log('AuthGuard: Redirecting to login');
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url }});
    }
  });
};
