import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
})
export class AuthenticationComponent implements OnInit{
    registerMode = false;
    registerForm = false;

    constructor(private http: HttpClient,
                private authService: AuthService) { }

    ngOnInit() {
    }

    loggedIn() {
        return this.authService.loggedIn();
    }

    registerToggle() {
        this.registerMode = true;
    }

    cancelRegisterMode(registerMode: boolean) {
        this.registerMode = registerMode;
    }
}
