import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModalComponent } from '../../main/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  shoppingCart: any;
  bsModalRef: BsModalRef;
  shoppingLength: any;

  constructor(
    private _cartService: CartService,
    private modalService: BsModalService,
    private router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getProductFromStorage();
  }

  getProductFromStorage() {
    if (localStorage.productkey) {
      this.shoppingCart = JSON.parse(localStorage.productkey);
    } else {
      this.shoppingCart = {
        shoppingList: []
      };
    }
    this.shoppingLength = this.shoppingCart.shoppingList.length;
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
  }

  emptyCart() {
    this.shoppingCart = {
      items: []
    };
    delete localStorage.productkey;
  }
}
