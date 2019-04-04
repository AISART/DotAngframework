import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {User} from '../models/user';
import {Injectable} from '@angular/core';
import {UserService} from '../services/user.service';
import {AlertifyService} from '../services/alertify.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ListResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 5;
    likesParam = 'Likers';

    constructor(private userService: UserService,
                private router: Router,
                private alerify: AlertifyService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParam).pipe(
            catchError(error => {
                this.alerify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
