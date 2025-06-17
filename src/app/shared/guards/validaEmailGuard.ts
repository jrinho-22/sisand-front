import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LocalStorageService } from "../services/local-storage.service";

export function validEmailGuard(): CanActivateFn {
    return () => {
      const localStorageS: LocalStorageService = inject(LocalStorageService);
      const router = inject(Router);
      const user = localStorageS.getUser()
      const isLoged = localStorageS.isLogged()
      
      if (isLoged && user.emailVerified) {
        return true
      }
      return router.createUrlTree(['/home']);
    };
  }