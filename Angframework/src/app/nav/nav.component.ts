import { AlertifyService } from './../services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
    model: any = {};

    constructor(public authService: AuthService,
                private alertify: AlertifyService) { }

    ngOnInit() {
    }

    login() {
        this.authService.login(this.model).subscribe(next => {
            this.alertify.success('Logged in successfully');
        }, error => {
            this.alertify.error(error);
        });
    }

    loggedIn() {
        return this.authService.loggedIn();
    }

    logOut() {
        localStorage.removeItem('token');
        this.alertify.message('succesfully logged out');
    }
}
