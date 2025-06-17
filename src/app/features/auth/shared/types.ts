import { FormControl } from "@angular/forms"

export interface Login {
    email: string,
    password: string
}

export type LoginForm = {
    [P in keyof Login]: FormControl<Login[P]>
}