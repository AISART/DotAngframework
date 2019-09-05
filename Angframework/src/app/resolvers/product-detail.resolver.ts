import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AlertifyService} from '../services/alertify.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Product} from '../models/product';
import {ProductService} from '../services/product.service';

@Injectable()
export class ProductDetailResolver implements Resolve<Product> {
    constructor(private productService: ProductService,
                private router: Router,
                private alerify: AlertifyService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Product> {
        return this.productService.GetProduct(route.params['id']).pipe(
            catchError(error => {
                this.alerify.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
