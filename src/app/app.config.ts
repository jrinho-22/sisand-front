import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideEnvironmentNgxMask } from 'ngx-mask'
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LocalStorageService } from './shared/services/local-storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptorsFromDi()),
    provideEnvironmentNgxMask(),
    {
      provide: APP_INITIALIZER,
      useFactory: (localStorageService: LocalStorageService) => async () => await localStorageService.init(),
      deps: [LocalStorageService],
      multi: true
    }
  ]
};
