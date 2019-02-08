import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/model/iproduct';
import { ICategories } from '../../../../model/category';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {
  classAdd = false;
  categories: ICategories;
  form: FormGroup;
  add: boolean;
  categoryId: number;
  title: string;
  btnName: string;
  editForm: ICategories = {} as ICategories;
  newForm: ICategories;

  constructor(
    private formBuild: FormBuilder,
    private _serviceCategory: CategoryService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.formBuilder();
    const page = this.activeRoute.snapshot.params.mode;
    if (page === 'add') {
      this.add = true;
      this.title = 'Add';
      this.btnName = 'Add Category';
    } else if (page === 'edit') {
      // tslint:disable-next-line:radix
      this.categoryId = parseInt(this.activeRoute.snapshot.params.id);
      this.title = 'Edit';
      this.btnName = 'Update';
      this.fillForm();
      this.add = false;
    } else {
      this._toastr.error('Page Not Find');
    }
  }

  getCategories() {
    this._serviceCategory.getCategories().subscribe((data: ICategories) => {
      this.categories = data;
    });
  }

  formBuilder() {
    this.form = this.formBuild.group({
      name: ['', Validators.required],
      parentCategoryName: [''],
      description: ['']
    });
  }

  onSubmit() {
    if (this.add) {
      this.addCategory();
    } else {
      this.updateCategory();
    }
  }

  addCategory() {
    this.newForm = this.form.value;
    this._serviceCategory
      .addCategories(this.newForm)
      .subscribe((res: IProduct) => {
        this._toastr.info('New Category is Successful Added');
        this.route.navigate(['/categories']);
      });
  }

  fillForm() {
    this._serviceCategory.getOneCategory(this.categoryId).subscribe((res: ICategories) => {
      this.editForm = res;
      this.form.get('name').setValue(this.editForm.name);
      this.form
        .get('parentCategoryName')
        .setValue(this.editForm.parentCategoryName);
      this.form.get('description').setValue(this.editForm.description);
    });
  }

  updateCategory() {
    this._serviceCategory
      .updateCategories(this.categoryId, this.form.value)
      .subscribe((res: ICategories) => {
        this._toastr.info('Category is Successful Updated');
        this.route.navigate(['/categories']);
      });
  }
}
