import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';
import { ICategories } from 'src/app/model/category';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  btnEnable = false;
  categories = this._service.categoriesList;
  category = {
    name: '',
    description: '',
    parentCategoryName: ''
  };
  ngName: string;
  ngDesc: string;
  ngParent: string;

  constructor(private _service: CategoryService, private router: Router) {}

  ngOnInit() {}

  addCategory() {
    this.category.name = this.ngName;
    this.category.description = this.ngDesc;
    this.category.parentCategoryName = this.ngParent;
    this._service.addCategories(this.category).subscribe(res => {
      this._service.getCategories();
      this.router.navigate(['/categories']);
    });
  }
}
