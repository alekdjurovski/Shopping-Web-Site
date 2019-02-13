import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/model/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  productId: number;
  product: IProduct;
  shoppingList: any;
  shoppingCart: any;

  constructor(private activeRoute: ActivatedRoute,
            private _productService: ProductService,
            private _cartService: CartService,
            private _toastr: ToastrService) { }

  ngOnInit() {
    // tslint:disable-next-line:radix
    this.productId = parseInt(this.activeRoute.snapshot.params.id);
    this.getOneProduct();
  }

  getOneProduct() {
    this._productService.getOneProduct(this.productId).subscribe((res: IProduct) => {
      this.product = res;

    });
  }

  addToCart() {
    if (localStorage.productkey) {
      this.shoppingCart = JSON.parse(localStorage.productkey);
    } else {
      this.shoppingCart = { shoppingList: [] };
    }
    this.shoppingCart.shoppingList.push(this.product);
    this._cartService.addToCart(this.shoppingCart);
    this._toastr.info('Product is Successful Added');
  }

  }
