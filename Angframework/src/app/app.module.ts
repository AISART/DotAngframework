import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule, BsDropdownModule, ButtonsModule, ModalModule, PaginationModule, TabsModule} from 'ngx-bootstrap';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';
import {AuthGuard} from './guards/auth.guard';
import {JwtModule} from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';

import {AuthService} from './services/auth.service';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {ErrorInterceptorProvider} from './services/error.interceptor';
import {AlertifyService} from './services/alertify.service';
import {MemberListComponent} from './members/member-list/member-list.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ListsComponent} from './lists/lists.component';
import {MessagesComponent} from './messages/messages.component';
import {UserService} from './services/user.service';
import {MemberCardComponent} from './members/member-card/member-card.component';
import {MemberDetailComponent} from './members/member-detail/member-detail.component';
import {MemberDetailResolver} from './resolvers/member-detail.resolver';
import {MemberListResolver} from './resolvers/member-list.resolver';
import {NgxGalleryModule} from 'ngx-gallery';
import {MembersEditComponent} from './members/members-edit/members-edit.component';
import {MemberEditResolver} from './resolvers/member-edit.resolver';
import {PreventUnsavedChanges} from './guards/prevend-unsaved-changes.guard';
import {PhotoEditorComponent} from './members/photo-editor/photo-editor.component';
import {FileUploadModule} from 'ng2-file-upload';
import {TimeAgoPipe} from 'time-ago-pipe';
import {ListResolver} from './resolvers/lists.resolver';
import {MessagesResolver} from './resolvers/messages.resolver';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { RolesModalComponent } from './admin/roles-modal/roles-modal.component';
import { RegisterKnowAsComponent } from './register/register-know-as/register-know-as.component';
import { RegisterGenderComponent } from './register/register-gender/register-gender.component';
import { RegisterBirthComponent } from './register/register-birth/register-birth.component';
import { RegisterCityCountryComponent } from './register/register-city-country/register-city-country.component';
import { RegisterAccountComponent } from './register/register-account/register-account.component';
import { SubmitButtonComponent } from './shared/submit-button/submit-button.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';

export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        HomeComponent,
        RegisterComponent,
        MemberListComponent,
        ProductListComponent,
        ListsComponent,
        MessagesComponent,
        MemberCardComponent,
        MemberDetailComponent,
        MembersEditComponent,
        PhotoEditorComponent,
        TimeAgoPipe,
        MemberMessagesComponent,
        AdminPanelComponent,
        HasRoleDirective,
        PhotoManagementComponent,
        UserManagementComponent,
        RolesModalComponent,
        RegisterKnowAsComponent,
        RegisterGenderComponent,
        RegisterBirthComponent,
        RegisterCityCountryComponent,
        RegisterAccountComponent,
        SubmitButtonComponent,
        LoginComponent,
        ForgotPasswordComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BsDropdownModule.forRoot(),
        BsDatepickerModule.forRoot(),
        PaginationModule.forRoot(),
        TabsModule.forRoot(),
        ButtonsModule.forRoot(),
        RouterModule.forRoot(appRoutes),
        ModalModule.forRoot(),
        NgxGalleryModule,
        FileUploadModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:5000'],
                blacklistedRoutes: ['localhost:5000/api/auth']
            }
        })
    ],
    providers: [
        AuthService,
        ErrorInterceptorProvider,
        AlertifyService,
        AuthGuard,
        UserService,
        MemberDetailResolver,
        MemberListResolver,
        MemberEditResolver,
        PreventUnsavedChanges,
        ListResolver,
        MessagesResolver
    ],
    bootstrap: [
        AppComponent
    ],
    entryComponents: [
        RolesModalComponent
    ]
})
export class AppModule {
}
