import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ICategories } from 'src/app/model/category';
import { IProduct } from 'src/app/model/iproduct';
import { FilterService } from 'src/app/services/filter.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  products: IProduct;
  categories: ICategories;
  shoppingCart: any;
  shoppingLength: any;

  constructor(
    private _categoriesService: CategoryService,
    private _filterService: FilterService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getCategories();
    this._filterService.updateCartCounter();
  }

  getCategories() {
    this._categoriesService.getCategories().subscribe((data: ICategories) => {
      this.categories = data;
      this.spinner.hide();
      this._categoriesService.categoriesList = data;
    });
  }
}
