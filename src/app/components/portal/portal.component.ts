import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { ICategories } from 'src/app/model/category';
import { IProduct } from 'src/app/model/iproduct';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  products: IProduct;
  categories: ICategories;

  constructor(
    private _productService: ProductService,
    private _categoriesService: CategoryService
  ) {}

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this._productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  getCategories() {
    this._categoriesService.getCategories().subscribe(data => {
      this.categories = data;
      this._categoriesService.categoriesList = data;
    });
  }
}
