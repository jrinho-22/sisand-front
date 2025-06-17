import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IUsersSession } from '../../../shared/types/IUserSession';
import { BaseService } from '../../../shared/services/api/api.service';
import { Login } from './types';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Injectable()
export class LoginService extends BaseService<IUsersSession> {
    private localStorageS = inject(LocalStorageService)

    constructor(http: HttpClient) {
        super(http);
    }

    config() {
        return "login"
    }

    async login(body: Login) {
        const result: IUsersSession = await firstValueFrom(this.post('', body));
        this.localStorageS.registerUser(result)
    }
}
