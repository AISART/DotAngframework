import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router,
                private toastr: ToastrService) {}

    canActivate(next: ActivatedRouteSnapshot): | boolean {


        if (this.authService.loggedIn()) {
            this.router.navigate(['/members']);
            this.toastr.success('You succesfully logged in')
            return false;
        }
        return true;
    }
}
