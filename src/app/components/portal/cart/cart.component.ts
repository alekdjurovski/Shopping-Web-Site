import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModalComponent } from '../../main/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FilterService } from 'src/app/services/filter.service';
import { ProductService } from 'src/app/services/product.service';
import { ReloadService } from 'src/app/services/reload.service';
import { IProduct } from 'src/app/model/iproduct';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  shoppingCart = [];
  bsModalRef: BsModalRef;
  shoppingLength: any;
  quantity = 1;
  quant: any;
  itemRemove: any;
  total = 0;
  sum: number;
  showLoader = true;

  constructor(
    private _cartService: CartService,
    private _productService: ProductService,
    private modalService: BsModalService,
    private router: Router,
    private _toastr: ToastrService,
    private _filterService: FilterService,
    private _reloadService: ReloadService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
     /** spinner starts on init */
     this.spinner.show();

     setTimeout(() => {
         /** spinner ends after 5 seconds */
         this.spinner.hide();
     }, 2000);

    this.reload();
    this.totalSum();

  }

  reload() {
    this._reloadService.reloadCart();
    this._reloadService.cartCast.subscribe(res => {
      this.shoppingCart = res;
      // this.spinner.hide();
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 1000);
    });
  }

  onQuantityChange(i) {
    this.shoppingCart[i].quantity = this.quant;
  }

  decrease(i) {
    if (this.shoppingCart[i].quantity > 1) {
      this.shoppingCart[i].quantity -= 1;
    }
  }

  increase(i) {
    if (this.shoppingCart[i].quantity > 0) {
      this.shoppingCart[i].quantity += 1;
    }
  }

  updateQuantity(i, newQuantity) {
    if (this.shoppingCart[i].quantity > 0) {
      this.shoppingCart[i].quantity = newQuantity;
      localStorage.setItem('productKey', JSON.stringify(this.shoppingCart));
      this._reloadService.reloadCart();
      this.total = 0;
      this.totalSum();

    }
  }

  del(i) {
    this.itemRemove = JSON.parse(localStorage.productKey);
    this.itemRemove.splice(i, 1);
    localStorage.setItem('productKey', JSON.stringify(this.itemRemove));
    this._reloadService.reloadCart();
  }

  openModalWithComponent(id: number, param: string) {
    this._cartService.deleteId = id;
    this._productService.deleteParam = param;
    const initialState = {
      title: 'Delete Product',
      list: ['Are you sure you want to perform this action?']
    };
    this.bsModalRef = this.modalService.show(ModalComponent, { initialState });
    this.bsModalRef.content.okBtnName = 'Ok';
  }

  totalSum() {
    for (let i = 0; i < this.shoppingCart.length; i++) {
      this.sum = this.shoppingCart[i].price * this.shoppingCart[i].quantity;
      this.total += this.sum;
    }

  }

  onCheckout() {
    this.router.navigate(['/portal']);
    this._toastr.info('Your Order is Sent');
    this.emptyCart();
  }

  emptyCart() {
    this.shoppingCart = [];
    delete localStorage.productKey;
    this._filterService.updateCartCounter();
  }
}
