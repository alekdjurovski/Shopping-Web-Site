import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ICategories } from '../../../model/category';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  btnEnable = true;
  name: number;
  categories = this._service.categoriesList;
  editId: number;
  editName: string;
  id: number;
  category: ICategories;
  ngName: string;
  ngDesc: string;
  ngParent: string;

  constructor(
    private _service: CategoryService,
    private _toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.editCategory();
  }

  editCategory() {
    this._service.getOneCategory().subscribe((res: ICategories) => {
      this.category = res;
      this.ngName = this.category.name;
      this.ngDesc = this.category.description;
      this.ngParent = this.category.parentCategoryName;
    });
  }

  saveCategory() {
    this.category.name = this.ngName;
    this.category.description = this.ngDesc;
    this.category.parentCategoryName = this.ngParent;
    this._service
      .editCategories(this.category.id, this.category)
      .subscribe(res => {
        this.router.navigate(['/categories']);
        this._toastr.info('The Category is Successful Updated');
      });
  }
}
