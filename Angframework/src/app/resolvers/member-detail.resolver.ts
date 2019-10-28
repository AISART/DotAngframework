import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {User} from '../models/user';
import {Injectable} from '@angular/core';
import {UserService} from '../services/user.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
    constructor(private userService: UserService,
                private router: Router,
                private toastr: ToastrService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(route.params['id']).pipe(
            catchError(error => {
                this.toastr.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
