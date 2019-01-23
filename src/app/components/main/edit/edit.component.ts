import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ICategories } from '../../../model/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  btnEnable = false;
  name: number;
  categories = this._service.categoriesList;
  editId: number;
  editName: string;
  id: number;
  category: any = {
    name: '',
    description: '',
    // products: [],
    parentCategoryId: null
  };
  ngName: string;
  ngDesc: string;
  ngParentId: string;

  nameParent: string;

  constructor(private _service: CategoryService, private router: Router) {}

  ngOnInit() {
    this.editCategory();
  }

  editCategory() {
    this._service.getOneCategory().subscribe(res => {
      this.category = res;
      console.log(this.category);
      this.ngName = this.category.name;
      this.ngDesc = this.category.description;
      this.ngParentId = this.category.parentCategoryId;
    });
  }

  saveCategory() {
    this.category.name = this.ngName;
    this.category.description = this.ngDesc;
    this.category.parentCategoryId = this.ngParentId;
    this._service
      .editCategories(this.category.id, this.category)
      .subscribe(res => {
        // this._service.getCategories();
        this.router.navigate(['/categories']);
      });
  }
}
