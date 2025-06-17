import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { BaseService } from "../../../shared/services/api/api.service";
import { IUsersSession } from "../../../shared/types/IUserSession";
import { Login } from "../../auth/shared/types";
import { IUser } from "../../../shared/types/IUser";
import { UserDto } from "./types";

@Injectable()
export class UserService extends BaseService<IUser> {

    constructor(http: HttpClient) {
        super(http);
    }

    config() {
        return "User"
    }

    async getAll(url: string) {
        const result = await firstValueFrom(this.get(''));
        return result
    }

    async registerUser(user: UserDto) {
        const result = await firstValueFrom(this.post("", user));
        return result
    }

    async editUser(userId: string, user: Partial<UserDto>) {
        const result = await firstValueFrom(this.put(userId, user));
        return result
    }

    async deleteUser(userId: string) {
        const result = await firstValueFrom(this.delete(userId));
        return result
    }
}
