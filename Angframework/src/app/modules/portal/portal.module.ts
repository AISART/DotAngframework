import {NgModule} from '@angular/core';
import {ListsComponent} from './lists/lists.component';
import {MembersEditComponent} from './members/members-edit/members-edit.component';
import {MemberMessagesComponent} from './members/member-messages/member-messages.component';
import {MemberListComponent} from './members/member-list/member-list.component';
import {MemberCardComponent} from './members/member-card/member-card.component';
import {PhotoEditorComponent} from './members/photo-editor/photo-editor.component';
import {PortalComponent} from './portal.component';
import {PortalRoutingModule} from './portal-routing.module';
import {MemberDetailComponent} from './members/member-detail/member-detail.component';
import {MessagesComponent} from './messages/messages.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductCardComponent} from './product-list/product-card/product-card.component';
import {ProductDetailComponent} from './product-list/product-detail/product-detail.component';
import {SharedModule} from '../../shared/shared.module';
import {TimeAgoPipe} from 'time-ago-pipe';
import {BsDatepickerModule, BsDropdownModule, ButtonsModule, ModalModule, PaginationModule, TabsModule} from 'ngx-bootstrap';
import {SharedCoreModule} from '../../core/modules/shared-core.module';
import {NavComponent} from './nav/nav.component';
import {CarouselModule} from 'ngx-owl-carousel-o';

@NgModule({
    imports: [
        PortalRoutingModule,
        SharedModule,
        SharedCoreModule,
        TabsModule.forRoot(),
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
        PaginationModule.forRoot(),
        ButtonsModule.forRoot(),
        BsDropdownModule.forRoot(),
        CarouselModule
    ],
    declarations: [
        PortalComponent,
        NavComponent,
        TimeAgoPipe,
        ListsComponent,
        MembersEditComponent,
        MemberMessagesComponent,
        MemberDetailComponent,
        MemberListComponent,
        MemberCardComponent,
        MessagesComponent,
        ProductListComponent,
        ProductCardComponent,
        ProductDetailComponent,
        PhotoEditorComponent
    ],
    exports: [
        NavComponent
    ]
})
export class PortalModule {
}
