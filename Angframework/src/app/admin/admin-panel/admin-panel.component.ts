import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AlertifyService} from '../../services/alertify.service';
import {Router} from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/user-management', title: 'Dashboard',  icon: 'fa fa-dashboard', class: '' },
    { path: '/products', title: 'Products',  icon: 'fa fa-product-hunt', class: '' },
    { path: '/photo-management', title: 'Photo management',  icon: 'fa fa-image', class: '' },
];

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html'
})
export class AdminPanelComponent implements OnInit {
    innerWidth: any;
    menuItems: any[];
    photoUrl: string;

    constructor(private authService: AuthService,
                private alertify: AlertifyService,
                private router: Router) {
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = window.innerWidth;
    }

    ngOnInit() {
        this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.isMobileMenu();
    }

    isMobileMenu() {
        if (innerWidth > 991) {
            return false;
        }
        return true;
    }

    logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.authService.decodedToken = null;
        this.authService.currentUser = null;
        this.alertify.message('succesfully logged out');
        this.router.navigate(['/home']);
    }

}
