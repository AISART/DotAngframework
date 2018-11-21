import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
    model: any = {};

    constructor(private authService: AuthService) { }

    ngOnInit() {
    }

    login() {
        this.authService.login(this.model).subscribe(next => {
            console.log('logged in succes');
        }, error => {
            console.log(error);
        });
    }

    loggedIn() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    logOut() {
        localStorage.removeItem('token');
        console.log('logged out');
    }
}
