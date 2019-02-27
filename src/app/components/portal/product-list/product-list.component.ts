import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/model/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FilterService } from 'src/app/services/filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: IProduct;
  addProduct: IProduct;
  searchName: string;
  shoppingCart = [];
  quantity: number;
  sold: boolean;
  canAdd: boolean;
  categoryId = null;
  noProduct: boolean;

  constructor(
    private _cartService: CartService,
    private _filterService: FilterService,
    private _toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.reloadProduct();
  }

  reloadProduct() {
    this.categoryId = this._filterService.categoryId;
    this.searchName = this._filterService.searchName;
    if (this.categoryId || this.searchName) {
      this._filterService.castProd.subscribe((res: IProduct) => {
        this.products = res;
      });
    } else {
      this._filterService.filterProduct(null);
      this._filterService.castProd.subscribe((res: IProduct) => {
        this.products = res;
      });
    }
  }

  initialPrice() {
    if (this.addProduct.isAvailable === false) {
      this.quantity = 0;
    } else {
      this.quantity = 1;
    }
  }

  addToCart(i: number) {
    this.addProduct = this.products[i];
    this.initialPrice();
    this.addProduct.quantity = this.quantity;
    if (this.quantity === 1) {
      if (localStorage.productKey) {
        this.shoppingCart = JSON.parse(localStorage.productKey);
        // tslint:disable-next-line: no-shadowed-variable
        for (let i = 0; i < this.shoppingCart.length; i++) {
          if (this.shoppingCart[i].id === this.addProduct.id) {
            this._toastr.error('Product is already in the cart');
            this.router.navigate(['/cart']);
            this.canAdd = false;
            break;
          } else {
            this.canAdd = true;
          }
        }
        if (this.canAdd) {
          this.shoppingCart.push(this.addProduct);
          this._cartService.addToCart(this.shoppingCart);
          this._toastr.info('Product is Successful Added');
        }
      } else {
        this.shoppingCart = [];
        this.shoppingCart.push(this.addProduct);
        this._cartService.addToCart(this.shoppingCart);
        this._toastr.info('Product is Successful Added');
      }
    } else {
      this._toastr.error('Product is SOLD OUT');
    }
  }
}
