import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../models/product';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html'
})
export class ProductCardComponent implements OnInit {
    @Input() product: Product;

    constructor() {
    }

    ngOnInit() {
        console.log('product card');
    }

}
