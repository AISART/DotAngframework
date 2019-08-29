import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
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
