import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ICategories } from 'src/app/model/category';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  categories: ICategories;

  constructor(private _categoryService: CategoryService) {

  this.categories = this._categoryService.categoriesList;
  }

  ngOnInit() {
  }


}
