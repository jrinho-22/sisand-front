import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUsersSession } from '../types/IUserSession';
import { AuthService } from './api/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  protected authService = inject(AuthService)
  protected router = inject(Router)
  public authentication$: BehaviorSubject<IUsersSession>;

  constructor() {
    const initialUserSession = this.getUser(); // Tenta obter o usuário do localStorage    
    this.authentication$ = new BehaviorSubject<IUsersSession>(initialUserSession);
  }

  async init() {
    if (this.authentication$.value.id) {
      const dbUserSession = await this.authService.getUser(this.authentication$.value.id) as IUsersSession
      this.authentication$.next(dbUserSession)
      this.registerUser(dbUserSession)
    } 
  }

  public registerUser(authentication: IUsersSession) {
    localStorage.setItem(
      environment.USER_STORAGE,
      JSON.stringify(authentication)
    );
    this.authentication$.next(authentication); 
  }

  public getUser(): IUsersSession {
    return JSON.parse(
      localStorage.getItem(environment.USER_STORAGE) || '{}'
    );
  }

  public logout(redirect: boolean = true) {
    localStorage.removeItem(environment.USER_STORAGE);

    this.authentication$.next({} as IUsersSession);

    if (redirect) this.router.navigate(['/login']);
  }

  public isLogged(): boolean {
    var userSessionString = localStorage.getItem(environment.USER_STORAGE)
    var userSession: IUsersSession = userSessionString ? JSON.parse(userSessionString) : null  
    return userSession?.id ? true : false 
  }
}
