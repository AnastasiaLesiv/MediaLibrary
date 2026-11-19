import { HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (request, next) => { const toastr = inject(ToastrService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      const isLogin = request.url.includes('/api/Auth/login');

      let message = 'An unexpected error occurred. Please try again.';

      if (error.status === 0) {
        message = 'Cannot connect to the server. Please try again later.';
      } else if (
        isLogin &&
        (error.status === 401 || error.status === 404)
      ) {
        message = 'Incorrect username or password.';
      } else if (error.status === 400) {
        const validationErrors = error.error?.errors;

        if (validationErrors && typeof validationErrors === 'object') {
          const messages = Object.values(validationErrors)
            .flat()
            .filter(value => typeof value === 'string')
            .join(' ');

          message = messages || 'Please check the entered data.';
        } else if (
          typeof error.error === 'string' &&
          error.error.trim()
        ) {
          message = error.error;
        } else {
          message = 'Please check the entered data.';
        }
      } else if (error.status === 401) {
        message = 'Please sign in again.';
      } else if (error.status === 403) {
        message = 'You do not have permission to perform this action.';
      } else if (error.status === 404) {
        message = 'The requested record was not found.';
      } else if (error.status === 409) {
        message = 'The operation conflicts with existing data.';
      } else if (error.status >= 500) {
        message = 'A server error occurred. Please try again later.';
      }

      toastr.error(message, 'Error', {
        timeOut: 7000,
        closeButton: true,
        progressBar: true
      });

      return throwError(() => error);
    })
  );
};