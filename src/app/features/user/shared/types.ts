import { FormControl } from "@angular/forms"
import { IUser } from "../../../shared/types/IUser"

export type ListType = IUser & { email: string }

export interface UserDto {
    name: string,
    phone: string,
    cep: string,
    email: string,
    password: string
}

export type UserForm = {
    [P in keyof UserDto]: FormControl<UserDto[P]>
}