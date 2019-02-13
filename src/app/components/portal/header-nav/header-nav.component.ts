import { Component, OnInit } from '@angular/core';
import { ICategories } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/model/iproduct';
import { FilterService } from 'src/app/services/filter.service';

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
    private _cartService: CartService,
    private _filterService: FilterService
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
      this._filterService.getProducts(this.searchName);
  }
  // resetSearch() {
  //    this._filterService.getProducts(this.searchName)
  //     this.getProducts();
  //   }
  // }
}
