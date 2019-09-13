

import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {AdminDashboardComponent} from './admin-dashboard.component';
import {ProductManagementComponent} from './product-management/product-management.component';
import {PhotoManagementComponent} from './photo-management/photo-management.component';
import {UserManagementComponent} from './user-management/user-management.component';
import {ProductListResolver} from '../../resolvers/product-list.resolver';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductDetailResolver} from '../../resolvers/product-detail.resolver';

const ROUTES: Routes = [
    {path: '', redirectTo: 'admin/dashboard'},
    {
        path: '',
        component: AdminDashboardComponent,
        children: [
                {
                    path: 'dashboard',
                    component: AdminPanelComponent
                },
                {
                    path: 'product-management',
                    component: ProductManagementComponent,
                    resolve: {products: ProductListResolver},
                },
                {
                    path: 'product-management/:id',
                    component: ProductEditComponent,
                    resolve: {products: ProductDetailResolver}
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
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}

