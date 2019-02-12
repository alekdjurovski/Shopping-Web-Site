import { Component, OnInit } from '@angular/core';
import { ICategories } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {

  categories: ICategories;
  itemsCount: number;

  constructor(
    private _categoriesService: CategoryService,
    private _cartService: CartService
  ) {}

  ngOnInit() {
    this.getCategories();
  }


  getCategories() {
    this._categoriesService.getCategories().subscribe((data: ICategories) => {
      this.categories = data;
      this._categoriesService.categoriesList = data;
    });
  }
}
