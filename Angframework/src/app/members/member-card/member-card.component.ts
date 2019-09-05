import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {AlertifyService} from '../../services/alertify.service';

@Component({
    selector: 'app-member-card',
    templateUrl: './member-card.component.html'
})
export class MemberCardComponent implements OnInit {
    @Input() user: User;

    constructor(private authService: AuthService,
                private userService: UserService,
                private alertify: AlertifyService) {
    }

    ngOnInit() {
    }

    SendLike(id: number) {
        this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
            this.alertify.success('You have like' + this.user.knownAs);
        }, error => {
            this.alertify.error(error);
        });
    }
}
