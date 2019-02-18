import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModalComponent } from '../../main/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  shoppingCart: any;
  bsModalRef: BsModalRef;
  shoppingLength: any;
  quantity = 1;
  quant: any;

  constructor(
    private _cartService: CartService,
    private modalService: BsModalService,
    private router: Router,
    private _toastr: ToastrService,
    private _filterService: FilterService
  ) {}

  ngOnInit() {
    this.getProductFromStorage();
  }

  getProductFromStorage() {
    if (localStorage.productKey) {
      this.shoppingCart = JSON.parse(localStorage.productKey);
    } else {
      this.shoppingCart = [];
    }
  }

  onQuantityChange(i) {
    this.shoppingCart[i].quantity =  this.quant;
  }

  decrease(i) {
    if (this.shoppingCart[i].quantity) {
      this.shoppingCart[i].quantity -= 1;
    }
  }

  increase(i) {
    if (this.shoppingCart[i].quantity) {
      this.shoppingCart[i].quantity += 1;
    }
  }

  openModalWithComponent(id: number, param: string) {
    this._cartService.deleteId = id;
    this._cartService.deleteParam = param;
    const initialState = {
      list: ['Are you sure you want to perform this action?'],
      title: 'Delete Product'
    };
    this.bsModalRef = this.modalService.show(ModalComponent, { initialState });
    this.bsModalRef.content.okBtnName = 'Ok';
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
