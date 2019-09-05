import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {User} from './models/user';
import {
    Router,
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    jwtHelper = new JwtHelperService();
    public showOverlay = true;

    constructor(private authService: AuthService,
                private router: Router) {
        router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event);
        });
    }

    ngOnInit() {
        const token = localStorage.getItem('token');
        const user: User = JSON.parse(localStorage.getItem('user'));
        if (token) {
            this.authService.decodedToken = this.jwtHelper.decodeToken(token);
        }
        if (user) {
          this.authService.currentUser = user;
          this.authService.changeMemberPhoto(user.photoUrl);
        }
    }

    // Shows and hides the loading spinner during RouterEvent changes
    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.showOverlay = true;
        }
        if (event instanceof NavigationEnd) {
            this.showOverlay = false;
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            this.showOverlay = false;
        }
        if (event instanceof NavigationError) {
            this.showOverlay = false;
        }
    }
}
