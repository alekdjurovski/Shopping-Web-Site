import { Injectable } from '@angular/core';
import { IProduct } from '../model/iproduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  shoppingCart: any;
  deleteId: number;
  deleteParam: any;

  constructor() {}

  addToCart(item: IProduct) {
    if (localStorage && localStorage.shoppingCart) {
      this.shoppingCart = JSON.parse(localStorage.shoppingCart);
    } else {
      this.shoppingCart = { items: []};
    }
    this.shoppingCart.items.push(item);
    localStorage.shoppingCart = JSON.stringify(this.shoppingCart);
  }
}
