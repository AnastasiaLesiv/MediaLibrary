import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { acessTokenInterceptor } from '../core/interceptors/acess-token.interceptor';

export const appConfig: ApplicationConfig = { 
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()), 
    provideHttpClient(withInterceptors([acessTokenInterceptor])),
    provideAnimations(), 
    provideToastr()
  ]
};
