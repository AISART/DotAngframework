import {AuthService} from './../services/auth.service';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class PortalGuard implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router,
                private toastr: ToastrService) {
    }

    canActivate(next: ActivatedRouteSnapshot): | boolean {
        const roles = next.firstChild.data['roles'] as Array<string>;
        if (roles) {
            const match = this.authService.roleMatch(roles);
            if (match) {
                return true;
            } else {
                this.router.navigate(['members']);
                this.toastr.error('You are not authorised to access this area');
                return false;
            }
        }

        if (this.authService.loggedIn()) {
            return true;
        }

        this.router.navigate(['/authentication']);
        return false;
    }
}
