import {Component, OnInit} from '@angular/core';
import {Product} from '../../../models/product';
import {ProductService} from '../../../services/product.service';
import {AlertifyService} from '../../../services/alertify.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {
    product: Product[];
    Form: FormGroup;

    constructor(private productService: ProductService,
                private alertify: AlertifyService,
                private route: ActivatedRoute,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            console.log('data', data);
            this.product = data['products'];
            return this.product;
        }, error => {
            this.alertify.error(error);
        });

        this.Form = this.fb.group({
            name: this.product['name'],
            description: this.product['description'],
            url: this.product['url'],
            price: this.product['price'],
            availability: this.product['availability'],
            add_to_cart_url: this.product['add_to_cart_url'],
        });

    }

}
