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
import { PortalHomeComponent } from './portal-home/portal-home.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    imports: [
        PortalRoutingModule,
        SharedModule,
        SharedCoreModule,
        NgCircleProgressModule.forRoot({
            'backgroundColor': '#F5F5F5',
            'radius': 75,
            'space': 6,
            'maxPercent': 200,
            'unitsColor': '#d30000',
            'outerStrokeWidth': 5,
            'outerStrokeColor': '#d30000',
            'outerStrokeLinecap': 'square',
            'innerStrokeColor': '#d30000',
            'innerStrokeWidth': 19,
            'titleColor': '#d30000',
            'subtitleColor': '#d30000',
            'showSubtitle': false,
            'titleFontSize': '50',
            'showInnerStroke': false,
            'responsive': false,
        }),
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
        PhotoEditorComponent,
        PortalHomeComponent,
        FooterComponent
    ],
    exports: [
        NavComponent
    ]
})
export class PortalModule {
}
