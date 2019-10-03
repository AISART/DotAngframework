import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {AlertifyService} from '../../../services/alertify.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    model: any = {};
    forgotForm = false;
    loginMode = false;

    constructor(private authService: AuthService,
                private alertify: AlertifyService,
                private router: Router) {
    }

    ngOnInit() {
    }

    forgotPassword() {
        this.loginMode = true;
    }

    cancelForgotMode(forgotForm: boolean) {
        this.loginMode = forgotForm;
    }

    login() {
        this.authService.login(this.model).subscribe(next => {
            this.alertify.success('Logged in successfully');
        }, error => {
            this.alertify.error(error);
        }, () => {
            this.router.navigate(['/home']);
        });
    }

    loggedIn() {
        return this.authService.loggedIn();
    }

}
