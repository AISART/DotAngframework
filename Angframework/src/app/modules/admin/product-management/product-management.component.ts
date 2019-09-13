import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {AlertifyService} from '../../../services/alertify.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../models/product';

@Component({
    selector: 'app-product-management',
    templateUrl: './product-management.component.html'
})
export class ProductManagementComponent implements OnInit {

    Form: FormGroup;
    products: Product[];
    productname = '';
    description = '';
    websiteurl = '';
    productprice = '';
    productavailable = '';
    addtocart = '';

    constructor(private fb: FormBuilder,
                private productService: ProductService,
                private alertify: AlertifyService,
                private router: Router,
                private route: ActivatedRoute) {
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
        this.route.data.subscribe(data => {
            this.products = data['products'];
        }, error => {
            this.alertify.error(error);
        });
    }

    deleteProduct(id: number) {
        this.alertify.confirm('Are you sure you want to delete this product?', () => {
            this.productService.DeleteProduct(id).subscribe(() => {
                this.products.splice(this.products.findIndex(m => m.id === id), 1);
                this.alertify.success('This product has been deleted');
            }, error => {
                this.alertify.error('Failed to the product');
            });
        });
    }

    async Finish() {
        const form = await this.prepareFormData();
        console.log('form', form);
        this.productService.CreateProduct(form).subscribe(() => {
            this.alertify.success('Product is added!');
            this.router.navigate(['products']);
        });
    }

    protected getFormData() {
        return this.Form.value;
    }

    protected prepareFormData(): Promise<any> {
        return Promise.resolve(this.StripObject(this.getFormData()));
    }

    StripObject(obj) {
        for (const property in obj) {
            if (typeof obj[property] === 'object') {
                if (Object.prototype.toString.call(obj[property]) === '[object Array]') {
                    obj[property].forEach((object) => {
                        this.StripObject(object);
                    });
                } else {
                    this.StripObject(obj[property]);
                }
            } else {
                if (property === 'classType') {
                    delete obj.classType;
                }
            }
        }

        return obj;
    }

}
