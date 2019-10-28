import {Component, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-portal-home',
    templateUrl: './portal-home.component.html'
})
export class PortalHomeComponent implements OnInit {
    customOptions: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        margin: 10,
        autoWidth: true,
        items: 1,
        navText: ['', ''],
        nav: true
    };

    constructor() {
    }

    ngOnInit() {
    }

}
