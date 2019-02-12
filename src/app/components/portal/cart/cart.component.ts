import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModalComponent } from '../../main/modal/modal.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  shoppingCart: any;
  bsModalRef: BsModalRef;

  constructor(private _cartService: CartService,
    private modalService: BsModalService) {}

  ngOnInit() {
    if (window.localStorage && window.localStorage.shoppingCart) {
      this.shoppingCart = JSON.parse(window.localStorage.shoppingCart);
    } else {
      this.shoppingCart = {
        items: [],
        total: 0
      };
    }
  }

  openModalWithComponent(id: number, param: string) {
    this._cartService.deleteId = id;
    this._cartService.deleteParam = param;
    const initialState = {
      list: ['Are you sure you want to perform this action?'],
      title: 'Delete category'
    };
    this.bsModalRef = this.modalService.show(ModalComponent, { initialState });
    this.bsModalRef.content.okBtnName = 'Ok';
  }

}
