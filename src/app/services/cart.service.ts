import { Injectable } from '@angular/core';
import { IProduct } from '../model/iproduct';
import { FilterService } from './filter.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  shoppingCart: string;
  deleteId: number;
  deleteParam: any;
  product: IProduct;

  constructor(private _filterService: FilterService) {}

  addToCart(item) {

    localStorage.setItem('productkey', JSON.stringify(item));
    this._filterService.updateCartCounter();
  }
}
