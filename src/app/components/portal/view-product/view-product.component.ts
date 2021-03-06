import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/model/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  product: IProduct = {} as IProduct;
  productId: number;
  totalPrice: number;
  quantity: number;
  sold: boolean;
  canAdd: boolean;
  shoppingCart = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private _productService: ProductService,
    private _cartService: CartService,
    private _toastr: ToastrService
  ) {}

  ngOnInit() {
    // tslint:disable-next-line:radix
    this.productId = parseInt(this.activeRoute.snapshot.params.id);
    this.getOneProduct();
  }

  getOneProduct() {
    this._productService
      .getOneProduct(this.productId)
      .subscribe((res: IProduct) => {
        this.product = res;
        this.initialPrice();
      });
  }

  initialPrice() {
    if (this.product.isAvailable === false) {
      this.quantity = 0;
      this.sold = true;
    } else {
      this.quantity = 1;
      this.onQuantityChange();
    }
  }

  onQuantityChange() {
    this.totalPrice = this.product.price * this.quantity;
  }

  addToCart() {
    this.product.quantity = this.quantity;
    if (localStorage.productKey) {
      this.shoppingCart = JSON.parse(localStorage.productKey);
      for (let i = 0; i < this.shoppingCart.length; i++) {
        if (this.shoppingCart[i].id === this.product.id) {
          this.shoppingCart[i].quantity = this.quantity;
          this._cartService.addToCart(this.shoppingCart);
          this._toastr.info('Quantity is Updated');
          this.canAdd = false;
          break;
        } else {
          this.canAdd = true;
        }
      }
      if (this.canAdd) {
        this.addNewProduct();
      }
    } else {
      this.addNewProduct();
    }
  }

  addNewProduct() {
    this.shoppingCart.push(this.product);
    this._cartService.addToCart(this.shoppingCart);
    this._toastr.info('Product is Successful Added');
  }

}
