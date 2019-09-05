import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {AlertifyService} from '../../services/alertify.service';
import {ActivatedRoute} from '@angular/router';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';
import {TabsetComponent} from 'ngx-bootstrap';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-member-detail',
    templateUrl: './member-detail.component.html'
})
export class MemberDetailComponent implements OnInit {
    @ViewChild('memberTabs', { static: true }) memberTabs: TabsetComponent;

    user: User;
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    constructor(private usersService: UserService,
                private authService: AuthService,
                private alertify: AlertifyService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.user = data['user'];
        }, error => {
            this.alertify.error(error);
        });

        this.route.queryParams.subscribe(params => {
            const selectedTab = params['tab'];
            this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
        });

        this.galleryOptions = [
            {
                width: '500px',
                height: '500px',
                imagePercent: 100,
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide,
                preview: false
            }
        ];
        this.galleryImages = this.getImages();
    }

    getImages() {
        const imageUrls = [];
        for (let i = 0; i < this.user.photos.length; i++) {
            imageUrls.push({
                small: this.user.photos[i].url,
                medium: this.user.photos[i].url,
                big: this.user.photos[i].url,
                description: this.user.photos[i].description
            });
        }

        return imageUrls;
    }

    selectTab(tabId: number) {
        this.memberTabs.tabs[tabId].active = true;
    }

    SendLike(id: number) {
        this.usersService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
            this.alertify.success('You have like' + this.user.knownAs);
        }, error => {
            this.alertify.error(error);
        });
    }
}
