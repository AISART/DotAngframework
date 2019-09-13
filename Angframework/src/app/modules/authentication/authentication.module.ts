import {NgModule} from '@angular/core';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RegisterAccountComponent} from './register/register-account/register-account.component';
import {RegisterBirthComponent} from './register/register-birth/register-birth.component';
import {RegisterCityCountryComponent} from './register/register-city-country/register-city-country.component';
import {RegisterGenderComponent} from './register/register-gender/register-gender.component';
import {RegisterKnowAsComponent} from './register/register-know-as/register-know-as.component';
import {ForgotPasswordComponent} from './login/forgot-password/forgot-password.component';
import {AuthenticationComponent} from './authentication.component';
import {SharedModule} from '../../shared/shared.module';
import {SharedCoreModule} from '../../core/modules/shared-core.module';
import {BsDatepickerModule, BsDropdownModule, ButtonsModule, ModalModule, PaginationModule, TabsModule} from 'ngx-bootstrap';


@NgModule({
    imports: [
        AuthenticationRoutingModule,
        SharedModule,
        SharedCoreModule,
        TabsModule.forRoot(),
        ModalModule.forRoot(),
        BsDropdownModule.forRoot(),
        BsDatepickerModule.forRoot(),
        PaginationModule.forRoot(),
        ButtonsModule.forRoot(),
    ],
    declarations: [
        AuthenticationComponent,
        LoginComponent,
        ForgotPasswordComponent,
        RegisterComponent,
        RegisterAccountComponent,
        RegisterBirthComponent,
        RegisterCityCountryComponent,
        RegisterGenderComponent,
        RegisterKnowAsComponent,
    ]
})
export class AuthenticationModule {
}
