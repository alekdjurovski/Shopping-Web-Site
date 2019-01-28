import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../model/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productUrl = 'http://127.0.0.1:3000/products';

  constructor(private http: HttpClient) { }

  addProduct(product) {
    return this.http.post<IProduct>(this.productUrl, product);
  }
}
