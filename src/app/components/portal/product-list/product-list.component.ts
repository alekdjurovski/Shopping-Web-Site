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
  searchName: any;
  shoppingCart: any;
  // itemsCount: any;

  constructor(
    private _productService: ProductService,
    private _cartService: CartService,
    private _toastr: ToastrService
  ) {}

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
    if (localStorage.productkey) {
      this.shoppingCart = JSON.parse(localStorage.productkey);
    } else {
      this.shoppingCart = { shoppingList: [] };
    }
    this.shoppingCart.shoppingList.push(this.addProduct);
    this._cartService.addToCart(this.shoppingCart);
    this._toastr.info('Product is Successful Added');
  }

  search() {
    if (this.searchName) {
      this._productService
        .searchProduct(this.searchName)
        .subscribe((res: IProduct) => {
          return (this.products = res);
        });
    } else {
      this.resetSearch();
    }
  }

  resetSearch() {
    if (this.searchName === '') {
      this.getProducts();
    }
  }
}
