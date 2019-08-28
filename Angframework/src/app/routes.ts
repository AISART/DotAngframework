import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ProductListComponent } from './product-list/product-list.component';
import { ListsComponent } from './lists/lists.component';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import {MemberDetailComponent} from './members/member-detail/member-detail.component';
import {MemberDetailResolver} from './resolvers/member-detail.resolver';
import {MemberListResolver} from './resolvers/member-list.resolver';
import {MembersEditComponent} from './members/members-edit/members-edit.component';
import {MemberEditResolver} from './resolvers/member-edit.resolver';
import {PreventUnsavedChanges} from './guards/prevend-unsaved-changes.guard';
import {ListResolver} from './resolvers/lists.resolver';
import {MessagesResolver} from './resolvers/messages.resolver';
import {AdminPanelComponent} from './admin/admin-panel/admin-panel.component';
import {LoginComponent} from './login/login.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'members',
                component: MemberListComponent,
                resolve: {users: MemberListResolver}
            },            {
                path: 'members/:id',
                component: MemberDetailComponent,
                resolve: {user: MemberDetailResolver}
            },
            {
                path: 'member/edit',
                component: MembersEditComponent,
                resolve: {user: MemberEditResolver},
                canDeactivate: [PreventUnsavedChanges]
            },
            {
                path: 'messages',
                component: MessagesComponent,
                resolve: {messages: MessagesResolver}
            },
            {
                path: 'lists',
                component: ListsComponent,
                resolve: {users: ListResolver}
            },
            {
                path: 'products',
                component: ProductListComponent
            },
            {
                path: 'admin',
                component: AdminPanelComponent,
                data: {roles: ['Admin', 'Moderator']}
            }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
