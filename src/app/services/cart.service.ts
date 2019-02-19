import { Injectable } from '@angular/core';
import { IProduct } from '../model/iproduct';
import { FilterService } from './filter.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  shoppingCart: string;
  deleteId: number;
  deleteParam: any;
  product: IProduct;

  constructor(private _filterService: FilterService,
    private http: HttpClient) {}

  addToCart(item) {
    localStorage.setItem('productKey', JSON.stringify(item));
    this._filterService.updateCartCounter();
  }

  deleteProduct() {

  }


}
