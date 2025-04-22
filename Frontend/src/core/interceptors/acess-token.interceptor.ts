import { HttpInterceptorFn } from '@angular/common/http';
import { AppGlobalConstants } from '../global/global-variables';

export const acessTokenInterceptor: HttpInterceptorFn = (request, next) => {
  const accessToken = sessionStorage.getItem(AppGlobalConstants.sessionStorageAcessToken);

  if(!accessToken || request.url.includes('login')) return next(request);

  request = request.clone({
    headers: request.headers.append("Authorization", `Bearer ${accessToken}`),
  });

  return next(request);
};
