import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    GetProducts() {
        return this.http.get<Product[]>(this.baseUrl + 'products');
    }

    GetProduct(id: number) {
        return this.http.get<Product[]>(this.baseUrl + 'products/' + id);
    }

    CreateProduct(product: Product) {
        const url = this.baseUrl + 'products/create';
        return this.http.post(url, {...product});
    }
}
