import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxGalleryModule} from 'ngx-gallery';
import {FileUploadModule} from 'ng2-file-upload';
import {NgxCaptchaModule} from 'ngx-captcha';
import {HasRoleDirective} from '../../directives/has-role.directive';
import {TruncatePipe} from '../../libs/pipes/truncate.pipe';
import {ClickOutsideDirective} from '../../directives/click-outside.directive';

const components = [
    HasRoleDirective,
    ClickOutsideDirective,
    TruncatePipe
];

@NgModule({
    declarations: [
        ...components
    ],
    exports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxGalleryModule,
        FileUploadModule,
        NgxCaptchaModule,
        ...components
    ],
    imports: []
})
export class SharedCoreModule {
}
