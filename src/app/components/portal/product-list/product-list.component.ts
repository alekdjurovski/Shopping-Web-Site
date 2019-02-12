import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/model/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: IProduct;
  addProduct: any;
  constructor(private _productService: ProductService,
              private _cartService: CartService,
              private _toastr: ToastrService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe((data: IProduct) => {
      this.products = data;
    });
  }

addToCart(i: number) {
  this.addProduct = this.products[i];
  this._cartService.addToCart(this.addProduct);
  this._toastr.info('Product is Successful Added');

}

}
