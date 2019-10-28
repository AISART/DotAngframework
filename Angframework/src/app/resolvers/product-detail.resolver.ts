import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Product} from '../models/product';
import {ProductService} from '../services/product.service';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class ProductDetailResolver implements Resolve<Product> {
    constructor(private productService: ProductService,
                private router: Router,
                private toastr: ToastrService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Product> {
        return this.productService.GetProduct(route.params['id']).pipe(
            catchError(error => {
                this.toastr.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
