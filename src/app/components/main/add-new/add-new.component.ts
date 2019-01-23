import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  btnEnable = false;
  categories = this._service.categoriesList;
  category: any = {
    name: '',
    description: '',
    // products: [],
    parentCategoryId: null
  };
  ngName: string;
  ngDesc: string;
  ngParentId: number;

  constructor(private _service: CategoryService, private router: Router) {}

  ngOnInit() {}

  addCategory() {
    this.category.name = this.ngName;
    this.category.description = this.ngDesc;
    this.category.parentCategoryId = this.ngParentId;
    this._service.addCategories(this.category).subscribe(res => {
      this._service.getCategories();
      this.router.navigate(['/categories']);
    });
  }
}
