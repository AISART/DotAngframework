import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../../models/user';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../../services/user.service';
import {AuthService} from '../../../../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-members-edit',
    templateUrl: './members-edit.component.html'
})
export class MembersEditComponent implements OnInit {
    @ViewChild('editForm', {static: true}) editForm: NgForm;
    user: User;
    photoUrl: string;

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        if (this.editForm.dirty) {
            $event.returnValue = true;
        }
    }

    constructor(private route: ActivatedRoute,
                private toastr: ToastrService,
                private userService: UserService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.user = data['user'];
        });

        this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    }

    updateUser() {
        this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
            this.toastr.success('Profile updated');
            this.editForm.reset(this.user);
        }, error => {
            this.toastr.error(error);
        });
    }

    updateMainPhoto(photoUrl) {
        this.user.photoUrl = photoUrl;
    }
}
