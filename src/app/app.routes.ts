import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { authenticationGuard } from './shared/guards/authenticationGuard';
import { unAuthenticationGuard } from './shared/guards/unauthenticatedGuard';
import { UserComponent } from './features/user/user-list/user.component';
import { UserCadastroComponent } from './features/user/user-cadastro/user-cadastro.component';
import { validEmailGuard } from './shared/guards/validaEmailGuard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [unAuthenticationGuard()]
    },
    {
        path: 'home',
        component: UserComponent,
        canActivate: [authenticationGuard()]
    },
    {
        path: 'user-cadastro',
        component: UserCadastroComponent,
        canActivate: [validEmailGuard()]
    },
    {
        path: '**',
        redirectTo: "home",
        pathMatch: 'full'
    },
];
