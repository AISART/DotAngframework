import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './guards/auth.guard';
import {JwtModule} from '@auth0/angular-jwt';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {AuthService} from './services/auth.service';
import {ErrorInterceptorProvider} from './services/error.interceptor';
import {AlertifyService} from './services/alertify.service';
import {UserService} from './services/user.service';
import {MemberDetailResolver} from './resolvers/member-detail.resolver';
import {MemberListResolver} from './resolvers/member-list.resolver';
import {MemberEditResolver} from './resolvers/member-edit.resolver';
import {PreventUnsavedChanges} from './guards/prevend-unsaved-changes.guard';
import {ListResolver} from './resolvers/lists.resolver';
import {MessagesResolver} from './resolvers/messages.resolver';
import {ProductListResolver} from './resolvers/product-list.resolver';
import {ProductDetailResolver} from './resolvers/product-detail.resolver';

export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:5000'],
                blacklistedRoutes: ['localhost:5000/api/auth']
            }
        })
    ],
    providers: [
        HttpClient,
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
        MessagesResolver,
        ProductListResolver,
        ProductDetailResolver
    ],
    bootstrap: [
        AppComponent
    ],
})
export class AppModule {
}
