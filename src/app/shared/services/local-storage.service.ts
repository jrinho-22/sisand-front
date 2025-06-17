import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUsersSession } from '../types/IUserSession';
import { AuthService } from './api/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  protected authService = inject(AuthService)
  public authentication$: BehaviorSubject<IUsersSession>;

  constructor() {
    const initialUserSession = this.getUser(); // Tenta obter o usuário do localStorage    
    this.authentication$ = new BehaviorSubject<IUsersSession>(initialUserSession);
  }

  async init() {
    console.log(this.authentication$.value, 'this.authentication$.value')
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
    this.authentication$.next(authentication); // Atualiza o estado com o novo usuário
  }

  public getUser(): IUsersSession {
    return JSON.parse(
      localStorage.getItem(environment.USER_STORAGE) || '{}'
    );
  }

  public logout(redirect: boolean = true) {
    localStorage.removeItem(environment.USER_STORAGE);

    this.authentication$.next({} as IUsersSession);

    if (redirect) window.location.href = '../auth';
  }

  public isLogged(): boolean {
    return localStorage.getItem(environment.USER_STORAGE) ? true : false;
  }
}
