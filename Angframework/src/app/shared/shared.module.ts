import {NgModule} from '@angular/core';
import {SubmitButtonComponent} from './submit-button/submit-button.component';

const components = [
    SubmitButtonComponent
];

@NgModule({
    imports: [
    ],
    exports: [
        ...components
    ],
    declarations: components,

})
export class SharedModule {
}
