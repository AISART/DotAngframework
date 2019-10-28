import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../models/product';
import {ToastrService} from 'ngx-toastr';

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
                private toastr: ToastrService,
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
            this.toastr.error(error, 'Oeps...');
        });
    }

    deleteProduct(id: number) {
        this.productService.DeleteProduct(id).subscribe(() => {
            this.products.splice(this.products.findIndex(m => m.id === id), 1);
            this.toastr.success('This product has been deleted', 'Success!');
        }, error => {
            this.toastr.error('Failed to delete the product', 'Oeps...');
        });
    }

    async Finish() {
        const form = await this.prepareFormData();

        this.productService.CreateProduct(form).subscribe(() => {
            this.toastr.success('Product is added', 'Success!');
            this.router.navigate(['/products']);
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
