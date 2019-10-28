import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-photo-management',
    templateUrl: './photo-management.component.html'
})
export class PhotoManagementComponent implements OnInit {
    photos: any;

    constructor(private adminService: AdminService,
                private toastr: ToastrService) {
    }

    ngOnInit() {
        this.GetPhotosForApproval();
    }

    GetPhotosForApproval() {
        this.adminService.getPhotosForApproval().subscribe((photos) => {
            this.photos = photos;
        }, error => {
            this.toastr.error(error);
        });
    }

    ApprovePhoto(photoId) {
        this.adminService.approvePhoto(photoId).subscribe(() => {
            this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
        }, error => {
            this.toastr.error(error);
        });
    }

    RejectPhoto(photoId) {
        this.adminService.rejectPhoto(photoId).subscribe(() => {
            this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
        }, error => {
            this.toastr.error(error);
        });
    }

}
