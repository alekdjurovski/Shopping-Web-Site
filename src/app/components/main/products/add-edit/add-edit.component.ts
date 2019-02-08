import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { ReloadCategoriesService } from 'src/app/services/reload-categories.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/model/iproduct';
import { ICategories } from '../../../../model/category';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  classAdd = false;
  categories: ICategories;
  form: FormGroup;
  add: boolean;
  productId: number;
  title: string;
  btnName: string;
  editForm: IProduct = {} as IProduct;
  newForm: IProduct;
  imgUrl: any;
  uploadStatus: Observable<number>;
  imageUrl: string;
  newImgUrl: string;
  selectPic: File = null;
  remId: string;
  imageSrc: string;
  idImg: string;

  constructor(
    private formBuild: FormBuilder,
    private _serviceProduct: ProductService,
    private _serviceCategory: CategoryService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private _toastr: ToastrService,
    private _serviceReloadCategories: ReloadCategoriesService,
    private fireStorage: AngularFireStorage
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
      // tslint:disable-next-line:radix
      this.productId = parseInt(this.activeRoute.snapshot.params.id);
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
    this._serviceReloadCategories.cast.subscribe((data: ICategories) => {
      this.categories = data;
    });
  }

  formBuilder() {
    this.form = this.formBuild.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
      price: [0, Validators.required],
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
    this.newForm = this.form.value;
    this._serviceProduct.addProduct(this.newForm).subscribe((res: IProduct) => {
      this._toastr.info('New Product is Successful Added');
      this.route.navigate(['/products']);
    });
  }

  fillForm() {
    this._serviceProduct.getOneProduct(this.productId).subscribe((res: IProduct) => {
      this.editForm = res;
      this.form.get('name').setValue(this.editForm.name);
      this.imageSrc = this.editForm.imageUrl;
      this.form.get('price').setValue(this.editForm.price);
      this.form.get('manufacturer').setValue(this.editForm.manufacturer);
      this.form.get('isAvailable').setValue(this.editForm.isAvailable);
      this.form
        .get('shortDescription')
        .setValue(this.editForm.shortDescription);
      this.form.get('fullDescription').setValue(this.editForm.fullDescription);
      this.form.get('categoryId').setValue(this.editForm.categoryId);
    });
  }

  updateProduct() {
    this._serviceProduct
      .updateProduct(this.productId, this.form.value)
      .subscribe((res: IProduct) => {
        this._toastr.info('Product is Successful Updated');
        this.route.navigate(['/products']);
      });
  }

  chooseImg(event) {
    this.selectPic = <File>event.target.files[0];
    this.uploadPic();
  }

  uploadPic() {
    this.idImg = Math.random()
      .toString(36)
      .substring(8);
    const srcPath = `images/img_${this.idImg}`;
    const task = this.fireStorage.upload(srcPath, this.selectPic);
    const ref = this.fireStorage.ref(srcPath);
    this.uploadStatus = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(finalize(() => (this.imgUrl = ref.getDownloadURL().subscribe(
        data => {
          this.imageSrc = data;
          this.form.get('imageUrl').setValue(this.imageSrc);
        }
      ))))
      .subscribe();
  }

  deleteImg() {
    this.imageSrc = '';
    const deleteRef = firebase.storage().ref();
    deleteRef.child(`images/img_${this.idImg}`).delete().then(function() {
    });
    this._toastr.warning('Image is Deleted');
  }
}

