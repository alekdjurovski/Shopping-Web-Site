import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  classAdd = false;
  categories: any;
  ngParent: string;
  form: FormGroup;

  constructor(private formBuild: FormBuilder,
              private _serviceProduct: ProductService,
              private _serviceCategory: CategoryService) {
              }

  ngOnInit() {
    this.categories = this._serviceCategory.categoriesList;
    this.form = this.formBuild.group({
      name: ['', Validators.required],
      // categoryId: [null, Validators.required],
      manufacturer: ['', Validators.required],
      shortDescription: ['', Validators.required],
      fullDescription: ['', Validators.required]

    });
  }

  onSubmit() {
    this._serviceProduct.addProduct(this.form.value).subscribe(data => {
      console.log(data);

    });
    console.log(this.form.value);
  }

}
