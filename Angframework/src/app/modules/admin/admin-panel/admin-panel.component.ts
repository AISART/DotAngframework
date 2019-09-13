import {Component, HostListener, OnInit, AfterViewInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {AlertifyService} from '../../../services/alertify.service';
import {Router} from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard', title: 'Dashboard',  icon: 'fa fa-dashboard', class: '' },
    { path: '/admin/product-management', title: 'Product',  icon: 'fa fa-product-hunt', class: '' },
    { path: '/admin/photo-management', title: 'Photo',  icon: 'fa fa-image', class: '' },
    { path: '/admin/user-management', title: 'User',  icon: 'fa fa-user', class: '' },
];

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html'
})
export class AdminPanelComponent implements OnInit, AfterViewInit {
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

        const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

        if (isWindows) {
            // if we are on windows OS we activate the perfectScrollbar function
            document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
        } else {
            document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
        }

        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {

            let ps = new PerfectScrollbar(elemMainPanel);
            ps = new PerfectScrollbar(elemSidebar);
            return ps;
        }
    }

    ngAfterViewInit() {
        this.runOnRouteChange();
    }

    runOnRouteChange(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
            const ps = new PerfectScrollbar(elemMainPanel);
            ps.update();
        }
    }

    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
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
