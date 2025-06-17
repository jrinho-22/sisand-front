import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LocalStorageService } from "../services/local-storage.service";

export function authenticationGuard(): CanActivateFn {
    return () => {
      const localStorageS: LocalStorageService = inject(LocalStorageService);
      const router = inject(Router);
      
      if (localStorageS.isLogged() ) {
        return true
      }
      return router.createUrlTree(['/login']);
    };
  }