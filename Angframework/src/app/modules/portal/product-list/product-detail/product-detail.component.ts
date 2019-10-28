import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../../services/product.service';
import {Product} from '../../../../models/product';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
    product: Product;

    constructor(private productService: ProductService,
                private toastr: ToastrService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.product = data['product'];
        }, error => {
            this.toastr.error(error);
        });
    }

}
