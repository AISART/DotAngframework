import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
    @Output() cancelForgot = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    cancel() {
        this.cancelForgot.emit(false);
    }

}
