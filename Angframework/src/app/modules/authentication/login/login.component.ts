import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    model: any = {};
    forgotForm = false;
    loginMode = false;

    constructor(private authService: AuthService,
                private toastr: ToastrService,
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
            this.toastr.success('Enjoy.', 'Login succes!');
        }, error => {
            this.toastr.error(error, 'Something went wrong...');
        }, () => {
            this.router.navigate(['/home']);
        });
    }

    loggedIn() {
        return this.authService.loggedIn();
    }

}
