import { Injectable } from '@angular/core';
import { IProduct } from '../model/iproduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  shoppingCart: string;
  deleteId: number;
  deleteParam: any;

  product: IProduct;

  constructor() {}

  addToCart(item) {
    localStorage.setItem('productkey', JSON.stringify(item));
  }

}
