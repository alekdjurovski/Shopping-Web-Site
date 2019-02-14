import { Component, OnInit } from "@angular/core";
import { ICategories } from "src/app/model/category";
import { CategoryService } from "src/app/services/category.service";
import { CartService } from "src/app/services/cart.service";
import { ProductService } from "src/app/services/product.service";
import { IProduct } from "src/app/model/iproduct";
import { FilterService } from "src/app/services/filter.service";
import { ProductsComponent } from "../../main/products/products.component";

@Component({
  selector: "app-header-nav",
  templateUrl: "./header-nav.component.html",
  styleUrls: ["./header-nav.component.scss"]
})
export class HeaderNavComponent implements OnInit {
  categories: ICategories;
  searchName: any;
  products: IProduct;
  parentCategories: any;
  shoppingLength: any;
  parentC: any;
  parentCategory = [];

  constructor(
    private _categoriesService: CategoryService,
    private _productService: ProductService,
    private _cartService: CartService,
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
      console.log(this.products);
    });
  }

  allProduct() {
    this._filterService.filterProduct(null);
  }

  getCategories() {
    this._categoriesService.getCategories().subscribe((data: ICategories) => {
      this.categories = data.slice(4);

      console.log(this.categories);
      debugger;
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].parentCategoryName) {
          this.parentC = this.categories[i].parentCategoryName;
          if (this.parentCategory.length === 0) {
            this.parentCategory.push(this.parentC);
          } else {
            for (let x = 0; x < this.parentCategory.length; x++) {
              if (this.parentCategory[x] !== this.parentC) {
                this.parentCategory.push(this.parentC);
              }
            }
          }
        }

      }
      console.log("OVAAA" + this.parentCategory);

      this.parentCategories = data.slice(0, 4);
      this._categoriesService.categoriesList = data;
    });
  }

  search() {
    this._filterService.getProducts(this.searchName);
  }

  resetSearch() {
    if (this.searchName === "") {
      this._filterService.getProducts(this.searchName);
    }
  }

  filterByCategory(categoryId: number) {
    this._filterService.filterProduct(categoryId);
  }
}
