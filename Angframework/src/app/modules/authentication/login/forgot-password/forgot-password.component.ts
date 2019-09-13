import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {AlertifyService} from '../../../../services/alertify.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
    @Output() cancelForgot = new EventEmitter();
    model: any = {};

    constructor(private authService: AuthService,
                private alertify: AlertifyService,
                private router: Router) {
    }

    ngOnInit() {
    }

    cancel() {
        this.cancelForgot.emit(false);
    }

}
