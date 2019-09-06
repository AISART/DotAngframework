import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {AlertifyService} from '../../services/alertify.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-product-management',
    templateUrl: './product-management.component.html'
})
export class ProductManagementComponent implements OnInit {

    Form: FormGroup;

    constructor(private fb: FormBuilder,
                private productService: ProductService,
                private alertify: AlertifyService,
                private router: Router) {
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

    async Finish() {
        const form = await this.prepareFormData();
        console.log('form', form);
        this.productService.CreateProduct(form).subscribe(() => {
            this.alertify.success('owyea');
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
