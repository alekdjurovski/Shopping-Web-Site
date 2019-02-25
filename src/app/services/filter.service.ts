import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { IProduct } from '../model/iproduct';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private products = new BehaviorSubject<any>([]);
  castProd = this.products.asObservable();

  private counter = new BehaviorSubject<number>(0);
  counterItems = this.counter.asObservable();
  shopList: number;
  shoppingCart: any;
  shoppingLength: any;
  categoryId = null;
  searchName: string;
  noProduct: any;
  newArray: any;

  constructor(
    private _productService: ProductService,
    private router: Router,
    private _toastr: ToastrService
  ) {}

  getProducts(searchName) {
    if (searchName) {
      this.searchName = searchName;

      this._productService.searchProduct(searchName).subscribe(res => {
        this.newArray = res;
        if (this.newArray.length !== 0) {
          this.products.next(res);
        } else {
          this._toastr.warning(
            'Sorry, your search did not match any products. Please try again.',
            '',
            { positionClass: 'toast-top-full-width', timeOut: 3000 }
          );
          this.router.navigate(['']);
        }
      });
    } else if (searchName === '') {
      this._productService.getProducts().subscribe((data: IProduct) => {
        this.products.next(data);
      });
    }
  }

  filterProduct(categoryId) {
    if (categoryId) {
      this.categoryId = categoryId;
      this._productService
        .filterProduct(categoryId)
        .subscribe((filter: IProduct) => {
          debugger;
          this.products.next(filter);
        });
    } else {
      this.categoryId = null;
      this._productService.getProducts().subscribe((data: IProduct) => {
        this.products.next(data);
      });
    }
  }

  updateCartCounter() {
    if (localStorage.productKey) {
      this.shoppingCart = JSON.parse(localStorage.productKey);
      this.shoppingLength = this.shoppingCart.length;
    } else {
      this.shoppingLength = 0;
    }
    this.counter.next(this.shoppingLength);
  }
}
