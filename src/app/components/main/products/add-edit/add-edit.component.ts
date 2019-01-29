import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { ReloadCategoriesService } from 'src/app/services/reload-categories.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/model/iproduct';
import { ICategories } from '../../../../model/category';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  classAdd = false;
  categories: any;
  form: FormGroup;
  newForm: any;
  selectPic: null;
  imageUrl = '../../../../../assets/img/img-upload.jpg';
  picToUpload: File = null;

  constructor(
    private formBuild: FormBuilder,
    private _serviceProduct: ProductService,
    private _serviceCategory: CategoryService,
    private _toastr: ToastrService,
    private _serviceReloadCategories: ReloadCategoriesService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getCategories();
    this.form = this.formBuild.group({
      name: ['', Validators.required],
      manufacturer: ['', Validators.required],
      // isAvailable: [false, Validators.required],
      shortDescription: [''],
      fullDescription: [''],
      categoryId: [0, Validators.required]
    });
  }

  getCategories() {
    this._serviceCategory.getCategories().subscribe(data => {
      this.categories = data;
    });
    this._serviceReloadCategories.cast.subscribe((data: ICategories) => {
      this.categories = data;
    });
  }

  onImgSelect(event) {
this.selectPic = event.target.files[0];
  }

  inputPic(file: FileList) {
    this.picToUpload = file.item(0);

    // show image
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.picToUpload);

  }

  uploadPic() {
    const formData = new FormData();
    // formData.append('image', this.selectPic, this.selectPic.name);
    this.http.post('http://product-img.appspot.com' , formData);
  }

  onSubmit() {

    this.newForm = this.form.value;
    this._serviceProduct.addProduct(this.newForm).subscribe((res: IProduct) => {
      console.log(res);
      this._toastr.info('New Product is Successful Added');
    });
  }

}
