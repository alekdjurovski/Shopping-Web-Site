import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/model/iproduct';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: IProduct;
  addProduct: any;
  constructor(private _productService: ProductService) {}

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
  debugger;
}

}
