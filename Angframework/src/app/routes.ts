import {Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {ProductListComponent} from './product-list/product-list.component';
import {ListsComponent} from './lists/lists.component';
import {HomeComponent} from './home/home.component';
import {MemberListComponent} from './members/member-list/member-list.component';
import {MessagesComponent} from './messages/messages.component';
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
import {ProductDetailComponent} from './product-list/product-detail/product-detail.component';
import {ProductListResolver} from './resolvers/product-list.resolver';
import {ProductDetailResolver} from './resolvers/product-detail.resolver';
import {ProductManagementComponent} from './admin/product-management/product-management.component';
import {PhotoManagementComponent} from './admin/photo-management/photo-management.component';
import {UserManagementComponent} from './admin/user-management/user-management.component';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'members',
                component: MemberListComponent,
                resolve: {users: MemberListResolver}
            }, {
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
                component: ProductListComponent,
                resolve: {products: ProductListResolver}
            },
            {
                path: 'products/:id',
                component: ProductDetailComponent,
                resolve: {product: ProductDetailResolver}
            },
            {
                path: 'admin',
                component: AdminPanelComponent,
                data: {roles: ['Admin', 'Moderator']},
                children: [
                    {
                        path: 'dashboard',
                        component: AdminDashboardComponent
                    },
                    {
                        path: 'product-management',
                        component: ProductManagementComponent
                    },
                    {
                        path: 'photo-management',
                        component: PhotoManagementComponent
                    },
                    {
                        path: 'user-management',
                        component: UserManagementComponent
                    }
                ]
            }
        ]
    },
    {path: '**', redirectTo: 'login', pathMatch: 'full'}
];
