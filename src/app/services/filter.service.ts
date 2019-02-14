import { Injectable } from '@angular/core';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { IProduct } from '../model/iproduct';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private products = new BehaviorSubject<any>([]);
  castProd = this.products.asObservable();

  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private http: HttpClient
  ) {}

  getProducts(searchName) {
    if (searchName) {
      this._productService
        .searchProduct(searchName)
        .subscribe((res: IProduct) => {
          this.products.next(res);
        });
    } else if (searchName === '') {
      this._productService.getProducts().subscribe((data: IProduct) => {
        this.products.next(data);
      });
    }
  }

  filterProduct(categoryId) {
    if (categoryId) {
      this._productService
      .filterProduct(categoryId)
      .subscribe((filter: IProduct) => {
        this.products.next(filter);
      });
    } else {
      this._productService.getProducts().subscribe((data: IProduct) => {
        this.products.next(data);
      });
    }

  }
}
