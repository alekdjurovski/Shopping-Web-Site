import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { ReloadCategoriesService } from 'src/app/services/reload-categories.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/model/iproduct';
import { ICategories } from '../../../../model/category';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  classAdd = false;
  categories: any;
  form: FormGroup;
  selectPic: null;
  imageUrl = '../../../../../assets/img/img-upload.jpg';
  picToUpload: File = null;
  add: boolean;
  productId: number;
  title: string;
  btnName: string;
  editForm: any;
  newForm: any;

  constructor(
    private formBuild: FormBuilder,
    private _serviceProduct: ProductService,
    private _serviceCategory: CategoryService,
    private activeRoute: ActivatedRoute,
    private _toastr: ToastrService,
    private _serviceReloadCategories: ReloadCategoriesService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getCategories();
    this.formBuilder();
    const page = this.activeRoute.snapshot.params.addedit;
    if (page === 'add') {
      this.add = true;
      this.title = 'Add';
      this.btnName = 'Add Product';
    } else if (page === 'edit') {
      this.productId = this.activeRoute.snapshot.params.id;
      this.title = 'Edit';
      this.btnName = 'Update';
      this.fillForm();
      this.add = false;
    } else {
      this._toastr.error('Page Not Find');
    }
  }

  getCategories() {
    this._serviceCategory.getCategories().subscribe(data => {
      this.categories = data;
    });
    this._serviceReloadCategories.cast.subscribe((data: ICategories) => {
      this.categories = data;
    });
  }

  formBuilder() {
    this.form = this.formBuild.group({
      name: ['alek', Validators.required],
      manufacturer: ['', Validators.required],
      isAvailable: [false, Validators.required],
      shortDescription: [''],
      fullDescription: [''],
      categoryId: [0, Validators.required]
    });
  }

  onSubmit() {
    if (this.add) {
      this.addProduct();
    } else {
      this.updateProduct();
    }
  }

  addProduct() {
    debugger;
    this.newForm = this.form.value;
    this._serviceProduct.addProduct(this.newForm).subscribe((res: IProduct) => {
      this._toastr.info('New Product is Successful Added');
    });
  }

  fillForm() {
    debugger;
    this._serviceProduct.getOneProduct(this.productId).subscribe(res => {
      console.log(res);
      this.editForm = res;
    });
  }

  updateProduct() {
    this._serviceProduct
      .updateProduct(this.productId, this.form.value)
      .subscribe((res: IProduct) => {
        this._toastr.info('Product is Successful Updated');
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
    this.http.post('http://product-img.appspot.com', formData);
  }
}
