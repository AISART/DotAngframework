import { AlertifyService } from '../../../services/alertify.service';
import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
    @ViewChild('toggleButton', {static: false})toggleButton: ElementRef;
    @ViewChild('menu', {static: false})menu: ElementRef;

    model: any = {};
    photoUrl: string;
    isMenuOpen = false;

    constructor(public authService: AuthService,
                private alertify: AlertifyService,
                public router: Router,
                private renderer: Renderer2) {
        /**
         * This events get called by all clicks on the page
         */
        this.renderer.listen('window', 'click', (e) => {
            /**
             * Only run when toggleButton is not clicked
             * If we don't check this, all clicks (even on the toggle button) gets into this
             * section which in the result we might never see the menu open!
             * And the menu itself is checked here, and it's where we check just outside of
             * the menu and button the condition abbove must close the menu
             */
            if (this.isMenuOpen) {
                if (e.target !== this.toggleButton.nativeElement && e.target !== this.menu.nativeElement) {
                    this.isMenuOpen = false;
                }
            }
        });
    }

    ngOnInit() {
        this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    login() {
        this.authService.login(this.model).subscribe(next => {
            this.alertify.success('Logged in successfully');
        }, error => {
            this.alertify.error(error);
        }, () => {
            this.router.navigate(['/members']);
        });
    }


    loggedIn() {
        return this.authService.loggedIn();
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
