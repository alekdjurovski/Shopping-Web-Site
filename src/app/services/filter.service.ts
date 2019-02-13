import { Injectable } from '@angular/core';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { IProduct } from '../model/iproduct';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private products = new BehaviorSubject<any>([]);
  castProd = this.products.asObservable();

  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService
  ) {}

  getProducts(searchName) {
    if (searchName) {
      this._productService
        .searchProduct(searchName)
        .subscribe((res: IProduct) => {
          this.products.next(res);
        });
    } else {
      this._productService.getProducts().subscribe((data: IProduct) => {
        this.products.next(data);
      });
    }
  }
}
