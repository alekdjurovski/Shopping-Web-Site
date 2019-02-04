import { Component, OnInit } from '@angular/core';
import { ICategories } from '../../../model/category';
import { CategoryService } from '../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { ReloadCategoriesService } from 'src/app/services/reload-categories.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any;
  searchName: string;
  showSearch = false;
  bsModalRef: BsModalRef;
  categories: ICategories;

  constructor(
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _toastr: ToastrService,
    private modalService: BsModalService,
    private _reloadService: ReloadCategoriesService
  ) {}

  ngOnInit() {
    this.getProducts();
    this.reloadProduct();
    this.getCategories();
    // this._reloadService.cast.subscribe(data => {
    //   this.products = data;
    // });
  }

  getProducts() {
    this._productService.getProducts().subscribe(data => {
      this.products = data;
      this._productService.productsList = data;
    });

  }

  reloadProduct() {
    this._reloadService.castProd.subscribe(res => {
      this.products = res;
    });
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(data => {
      this.categories = data;
      this._categoryService.categoriesList = data;
    });
  }

  search() {
    if (this.searchName) {
      this.showSearch = true;
      this._productService.searchProduct(this.searchName).subscribe(res => {
        return (this.products = res);
      });
    } else {
      this.resetSearch();
    }
  }

  resetSearch() {
    if (this.searchName === '') {
      this.getCategories();
    }
  }

  clearSearch() {
    this.searchName = '';
    this.resetSearch();
    this.showSearch = false;
  }

  // editCategory(id) {
  //   this._service.editId = id;
  // }

  openModalWithComponent(id: number, param: string) {
    this._productService.deleteId = id;
    this._productService.deleteParam = param;
    const initialState = {
      list: ['Are you sure you want to perform this action?'],
      title: 'Delete category'
    };
    this.bsModalRef = this.modalService.show(ModalComponent, { initialState });
    this.bsModalRef.content.okBtnName = 'Ok';
  }
}
