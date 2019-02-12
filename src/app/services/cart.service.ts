import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../model/iproduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  shoppingCart: any;
  deleteId: number;
  deleteParam: any;

  constructor(private http: HttpClient) {}

  addToCart(item: IProduct) {
    if (window.localStorage && window.localStorage.shoppingCart) {
      this.shoppingCart = JSON.parse(window.localStorage.shoppingCart);
    } else {
      this.shoppingCart = { items: [], total: 0 };
    }
    this.shoppingCart.items.push(item);
    this.shoppingCart.total += item.price;
    window.localStorage.shoppingCart = JSON.stringify(this.shoppingCart);
  }
}
