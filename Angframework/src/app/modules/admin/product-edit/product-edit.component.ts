import {Component, OnInit} from '@angular/core';
import {Product} from '../../../models/product';
import {ProductService} from '../../../services/product.service';
import {AlertifyService} from '../../../services/alertify.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {
    product: Product[];
    Form: FormGroup;
    Id: string;

    constructor(private productService: ProductService,
                private alertify: AlertifyService,
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private http: HttpClient) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            console.log('data', data);
            this.product = data['products'];
            return this.product;
        }, error => {
            this.alertify.error(error);
        });

        this.Id = this.route.snapshot.params.id;

        this.Form = this.fb.group({
            name: this.product['name'],
            description: this.product['description'],
            url: this.product['url'],
            price: this.product['price'],
            availability: this.product['availability'],
            add_to_cart_url: this.product['add_to_cart_url'],
        });
    }

    getFormData() {
        return this.Form.value;
    }

    prepareFormData(): Promise<any> {
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

    async Submit() {
        const form = await this.prepareFormData();

        this.http.patch(this.productService.baseUrl + 'products/' + this.Id, form).subscribe(() => {
            this.alertify.success('Product updated');
            this.router.navigate(['/admin/product-management']);
        }, (error) => {
            console.log('error', error);
        });
    }

}
