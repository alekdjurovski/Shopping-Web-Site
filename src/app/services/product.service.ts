import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../model/iproduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productsUrl = 'http://127.0.0.1:3000/products';
  public searchUrl =
    'http://127.0.0.1:3000/products?filter[where][name][eq]=';

  deleteId: number;
  deleteParam: string;
  productsList: IProduct;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct> {
    return this.http.get<IProduct>(this.productsUrl);
  }

  addProduct(product) {
    return this.http.post<IProduct>(this.productsUrl, product);
  }

  getOneProduct(id): Observable<any> {
    return this.http.get<any>(this.productsUrl + '/' + id);
  }

  updateProduct(productId: number, product: IProduct) {
    return this.http.put<IProduct>(this.productsUrl + '/' + productId, product);
  }

  searchProduct(name) {
    return this.http.get(this.searchUrl + name);
  }

  deleteProduct() {
    return this.http.delete(this.productsUrl + '/' + this.deleteId);
  }


}
