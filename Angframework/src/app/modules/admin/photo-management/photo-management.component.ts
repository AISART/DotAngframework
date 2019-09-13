import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {AlertifyService} from '../../../services/alertify.service';

@Component({
    selector: 'app-photo-management',
    templateUrl: './photo-management.component.html'
})
export class PhotoManagementComponent implements OnInit {
    photos: any;

    constructor(private adminService: AdminService,
                private alertify: AlertifyService) {
    }

    ngOnInit() {
        this.GetPhotosForApproval();
    }

    GetPhotosForApproval() {
        this.adminService.getPhotosForApproval().subscribe((photos) => {
            this.photos = photos;
        }, error => {
            this.alertify.error(error);
        });
    }

    ApprovePhoto(photoId) {
        this.adminService.approvePhoto(photoId).subscribe(() => {
            this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
        }, error => {
            this.alertify.error(error);
        });
    }

    RejectPhoto(photoId) {
        this.adminService.rejectPhoto(photoId).subscribe(() => {
            this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
        }, error => {
            this.alertify.error(error);
        });
    }

}
