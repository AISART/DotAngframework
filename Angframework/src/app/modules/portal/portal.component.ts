import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-portal',
    templateUrl: './portal.component.html'
})
export class PortalComponent implements OnInit {

    constructor(private authService: AuthService) {}

    ngOnInit() {
        document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-on');
    }

    loggedIn() {
        return this.authService.loggedIn();
    }

}
