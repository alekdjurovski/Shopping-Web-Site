import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../model/iproduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productsUrl = 'http://127.0.0.1:3000/products';

  constructor(private http: HttpClient) {}

  addProduct(product) {
    return this.http.post<IProduct>(this.productsUrl, product);
  }

  getOneProduct(id): Observable<any> {
    return this.http.get(this.productsUrl + '/' + id);
  }

  updateProduct(productId: number, product: IProduct) {
    return this.http.put<IProduct>(this.productsUrl + '/' + productId, product);
  }
}
