import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { IUsersSession } from "../../types/IUserSession";
import { BaseService } from "./api.service";

@Injectable({
    providedIn: "root"
})
export class AuthService extends BaseService<IUsersSession> {

    constructor(http: HttpClient) {
        super(http);
    }

    config() {
        return "Login"
    }

    async getUser(id: string) {
        try {
            const result = await firstValueFrom(this.get(id));
            return result
        } catch (error) {
            return {}
        }
    }
}
