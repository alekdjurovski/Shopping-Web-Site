import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/model/iproduct';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  productId: number;
  product: IProduct;

  constructor(private activeRoute: ActivatedRoute,
            private _productService: ProductService) { }

  ngOnInit() {
    // tslint:disable-next-line:radix
    this.productId = parseInt(this.activeRoute.snapshot.params.id);
    this.getOneProduct();
  }

  getOneProduct() {
    this._productService.getOneProduct(this.productId).subscribe((product: IProduct) => {
      this.product = product;
      debugger;
    });
  }

}
