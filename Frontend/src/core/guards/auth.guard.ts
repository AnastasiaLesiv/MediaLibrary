import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppGlobalConstants } from '../global/global-variables';

export const authGuard: CanActivateFn = (route, state) => {
  let isAuthenticated = (sessionStorage.getItem(AppGlobalConstants.sessionStorageIsAuthenticated) === "true") 
                        && sessionStorage.getItem(AppGlobalConstants.sessionStorageAcessToken) !== null
  const router = inject(Router);
  if(!isAuthenticated){
    return router.navigateByUrl("/login");
  }

  return true;
};
