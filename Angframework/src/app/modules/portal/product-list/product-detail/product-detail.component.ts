import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../../services/product.service';
import {Product} from '../../../../models/product';
import {AlertifyService} from '../../../../services/alertify.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Route, Router} from '@angular/router';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
    product: Product;

    constructor(private productService: ProductService,
                private alertify: AlertifyService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.product = data['product'];
        }, error => {
            this.alertify.error(error);
        });
    }

}
