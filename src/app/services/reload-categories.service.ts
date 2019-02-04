import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ReloadCategoriesService {
  private categories = new BehaviorSubject<any>([]);
  private products = new BehaviorSubject<any>([]);
  cast = this.categories.asObservable();
  castProd = this.products.asObservable();

  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService
  ) {}

  getAllCategories() {
    this._categoryService.getCategories().subscribe(data => {
      this.categories.next(data);
    });
  }

  getAllProducts() {
    this._productService.getProducts().subscribe(res => {
      this.products.next(res);
    });
  }
}
