import {Component, OnInit} from '@angular/core';
import {Product} from '../models/product';
import {ProductService} from '../services/product.service';
import {AlertifyService} from '../services/alertify.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
    products: Product[];

    constructor(private productService: ProductService,
                private alertify: AlertifyService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.products = data['products'];
        }, error => {
            this.alertify.error(error);
        });
    }

}
