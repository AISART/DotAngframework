import { AlertifyService } from './../services/alertify.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router,
                private alertify: AlertifyService) {}

    canActivate(next: ActivatedRouteSnapshot): | boolean {


        if (this.authService.loggedIn()) {
            this.router.navigate(['/members']);
            return false;
        }
        return true;
    }
}
