import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PortalComponent} from './portal.component';
import {MemberListComponent} from './members/member-list/member-list.component';
import {MemberListResolver} from '../../resolvers/member-list.resolver';
import {MemberDetailComponent} from './members/member-detail/member-detail.component';
import {MemberDetailResolver} from '../../resolvers/member-detail.resolver';
import {MembersEditComponent} from './members/members-edit/members-edit.component';
import {MemberEditResolver} from '../../resolvers/member-edit.resolver';
import {PreventUnsavedChanges} from '../../guards/prevend-unsaved-changes.guard';
import {MessagesComponent} from './messages/messages.component';
import {MessagesResolver} from '../../resolvers/messages.resolver';
import {ListsComponent} from './lists/lists.component';
import {ListResolver} from '../../resolvers/lists.resolver';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductListResolver} from '../../resolvers/product-list.resolver';
import {ProductDetailComponent} from './product-list/product-detail/product-detail.component';
import {ProductDetailResolver} from '../../resolvers/product-detail.resolver';

const ROUTES: Routes = [
    {
        path: '',
        component: PortalComponent,
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
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class PortalRoutingModule {
}
