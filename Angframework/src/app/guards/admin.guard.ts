import { AlertifyService } from './../services/alertify.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router,
                private alertify: AlertifyService) {}

    canActivate(next: ActivatedRouteSnapshot): | boolean {
        const expectedRole = next.firstChild.data['expectedRole'] as Array<string>;
        if (expectedRole) {
            const match = this.authService.roleMatch(expectedRole);
            if (match) {
                const token = localStorage.getItem('token');

                // decode the token to get its payload
                const tokenPayload = decode(token);

                if (!this.authService.loggedIn() || !expectedRole.some((expected) => tokenPayload.role.includes(expected))) {
                    console.log('hii')
                    this.router.navigate(['login']);
                    return false;
                }
                return true;
            }
            return false;
        }
        return true;
    }
}
