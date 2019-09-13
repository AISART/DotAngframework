

import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthenticationComponent} from './authentication.component';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './login/forgot-password/forgot-password.component';
import {RegisterComponent} from './register/register.component';

const ROUTES: Routes = [
    {path: '', redirectTo: 'authentication', pathMatch: 'full'},
    {
        path: '',
        component: AuthenticationComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
                children: [
                    {
                        path: 'forgot-password',
                        component: ForgotPasswordComponent
                    }
                ]
            },
            {
                path: 'register',
                component: RegisterComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}

