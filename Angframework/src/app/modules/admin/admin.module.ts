import {NgModule} from '@angular/core';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {NavbarComponent} from './navbar/navbar.component';
import {PhotoManagementComponent} from './photo-management/photo-management.component';
import {ProductManagementComponent} from './product-management/product-management.component';
import {RolesModalComponent} from './roles-modal/roles-modal.component';
import {UserManagementComponent} from './user-management/user-management.component';
import {SharedModule} from '../../shared/shared.module';
import {SharedCoreModule} from '../../core/modules/shared-core.module';
import {BsDatepickerModule, BsDropdownModule, ButtonsModule, ModalModule, PaginationModule, TabsModule} from 'ngx-bootstrap';
import {AdminDashboardComponent} from './admin-dashboard.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

@NgModule({
    imports: [
        AdminRoutingModule,
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
        AdminPanelComponent,
        AdminDashboardComponent,
        NavbarComponent,
        PhotoManagementComponent,
        ProductManagementComponent,
        RolesModalComponent,
        UserManagementComponent,
        ProductEditComponent
    ],
    entryComponents: [
        RolesModalComponent
    ]
})
export class AdminModule {
}
