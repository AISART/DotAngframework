import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import decode from 'jwt-decode';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router,
                private toastr: ToastrService) {}

    canActivate(next: ActivatedRouteSnapshot): | boolean {
        const expectedRole = next.firstChild.data['expectedRole'] as Array<string>;
        if (expectedRole) {
            const match = this.authService.roleMatch(expectedRole);
            if (match) {
                const token = localStorage.getItem('token');

                // decode the token to get its payload
                const tokenPayload = decode(token);

                if (!this.authService.loggedIn() || !expectedRole.some((expected) => tokenPayload.role.includes(expected))) {
                    this.router.navigate(['login']);
                    this.toastr.success('logged in');
                    return false;
                }
                return true;
            }
            return false;
        }
        return true;
    }
}
