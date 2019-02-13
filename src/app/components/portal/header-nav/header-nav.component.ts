import { Component, OnInit } from '@angular/core';
import { ICategories } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/model/iproduct';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {

  categories: ICategories;
  searchName: any;
  itemsCount: 3;
  products: IProduct;

  constructor(
    private _categoriesService: CategoryService,
    private _productService: ProductService,
    private _cartService: CartService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe((data: IProduct) => {
      this.products = data;
    });
  }


  getCategories() {
    this._categoriesService.getCategories().subscribe((data: ICategories) => {
      this.categories = data;
      this._categoriesService.categoriesList = data;
    });
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
