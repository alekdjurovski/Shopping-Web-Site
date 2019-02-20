import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/model/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FilterService } from 'src/app/services/filter.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: IProduct;
  addProduct: any;
  searchName: any;
  shoppingCart: any;
  quantity: number;
  sold: boolean;
  canAdd: boolean;
  allProducts = null;

  constructor(
    private _productService: ProductService,
    private _cartService: CartService,
    private _filterService: FilterService,
    private router: Router,
    private _toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    /** spinner starts on init */
 this.spinner.show();



    this.reloadProduct();
  }

  reloadProduct() {
    this.allProducts = this._filterService.categoryId;
    if (this.allProducts) {
      this._filterService.castProd.subscribe((res: IProduct) => {
        this.products = res;
      //   setTimeout(() => {
      //     /** spinner ends after 5 seconds */
      //     this.spinner.hide();
      // }, 2000);
      });
    } else {
      this._filterService.filterProduct(null);
      this._filterService.castProd.subscribe((res: IProduct) => {
        this.products = res;
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
      }, 2000);
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
        // tslint:disable-next-line:no-shadowed-variable
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
