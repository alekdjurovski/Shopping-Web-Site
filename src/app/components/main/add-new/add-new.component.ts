import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';
import { ICategories } from 'src/app/model/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  btnEnable = true;
  categories = this._service.categoriesList;
  // ngName: string;
  // ngDesc: string;
  id: number;
  name: string;
  ngParent = {
    id : 0,
    name: ''
  };
  category: ICategories = {} as ICategories;
  // = {
  //   name: '',
  //   description: '',
  //   parentCategoryName: ''
  // };

  constructor(
    private _service: CategoryService,
    private _toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}

  addCategory() {
    // this.category.name = this.ngName;
    // this.category.description = this.ngDesc;
    this.category.parentCategoryName = this.ngParent.name;
    this.category.parentCategoryId = this.ngParent.id;
    this._service.addCategories(this.category).subscribe((res: ICategories) => {
      this.router.navigate(['/categories']);
      this._toastr.info('The Category is Successful Added');
    });
  }
}
