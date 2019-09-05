import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-product-management',
    templateUrl: './product-management.component.html'
})
export class ProductManagementComponent implements OnInit {

    Form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.Form = this.fb.group({
            name: null,
            description: null,
            url: null,
            price: null,
            availability: null,
            add_to_cart_url: null
        });
    }

    Finish() {
        console.log('registeren dat product');
    }

}
