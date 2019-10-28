import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserService} from '../services/user.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Message} from '../models/message';
import {AuthService} from '../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';

    constructor(private userService: UserService,
                private router: Router,
                private toastr: ToastrService,
                private authService: AuthService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.userService
            .getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer).pipe(
                catchError(error => {
                    this.toastr.error('Problem retrieving messages');
                    this.router.navigate(['/home']);
                    return of(null);
                })
        );
    }
}
