import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/model/iproduct';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {
  categories = [];
  searchName: any;
  products: IProduct;
  shoppingLength: any;
  childCategory: any;
  parentCategory: any;
  childArray = [];
  parentArray = [];

  constructor(
    private _categoriesService: CategoryService,
    private _productService: ProductService,
    private _filterService: FilterService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getProducts();
    this._filterService.counterItems.subscribe(res => {
      this.shoppingLength = res;
    });
  }

  getProducts() {
    this._productService.getProducts().subscribe((data: IProduct) => {
      this.products = data;
    });
  }

  allProduct() {
    this._filterService.filterProduct(null);
  }

  getCategories() {
    this._categoriesService.getCategories().subscribe((data: any) => {
      this.categories = data;
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].parentCategoryName) {
          this.childCategory = this.categories[i];
          this.childArray.push(this.childCategory);
        } else {
          this.parentCategory = this.categories[i];
          this.parentArray.push(this.parentCategory);
        }
      }
    });
  }

  search() {
    this._filterService.getProducts(this.searchName);
  }

  resetSearch() {
    if (this.searchName === '') {
      this._filterService.getProducts(this.searchName);
    }
  }

  filterByCategory(categoryId: number) {
    this._filterService.filterProduct(categoryId);
  }
}
