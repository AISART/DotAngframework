import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ProductListComponent } from './product-list/product-list.component';
import { ListsComponent } from './lists/lists.component';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },

    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'members',
                component: MemberListComponent
            },
            {
                path: 'messages',
                component: MessagesComponent
            },
            {
                path: 'lists',
                component: ListsComponent
            },
            {
                path: 'products',
                component: ProductListComponent
            }
        ]
    },

    { path: '**', redirectTo: '', pathMatch: 'full' }
];
