import { AlertifyService } from '../../../services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import {OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
    model: any = {};
    photoUrl: string;

    customOptions: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        margin: 10,
        autoWidth: true,
        items: 1,
        navText: ['', ''],
        nav: true
    };

    constructor(public authService: AuthService,
                private alertify: AlertifyService,
                private router: Router) { }

    ngOnInit() {
      this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    }

    login() {
        this.authService.login(this.model).subscribe(next => {
            this.alertify.success('Logged in successfully');
        }, error => {
            this.alertify.error(error);
        }, () => {
            this.router.navigate(['/members']);
        });
    }

    loggedIn() {
        return this.authService.loggedIn();
    }

    logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.authService.decodedToken = null;
        this.authService.currentUser = null;
        this.alertify.message('succesfully logged out');
        this.router.navigate(['/home']);
    }
}
