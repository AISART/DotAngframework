import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {User} from '../models/user';
import {Injectable} from '@angular/core';
import {UserService} from '../services/user.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private userService: UserService,
                private router: Router,
                private toastr: ToastrService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.toastr.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
