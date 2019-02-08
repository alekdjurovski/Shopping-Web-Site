import { Component, OnInit } from '@angular/core';
import { ICategories } from '../../../model/category';
import { CategoryService } from '../../../services/category.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { ReloadCategoriesService } from 'src/app/services/reload-categories.service';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/model/iproduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: IProduct;
  searchName: string;
  showSearch = false;
  bsModalRef: BsModalRef;
  categories: ICategories;
  categoriesLength: number;
  categoryName: string;

  constructor(
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private modalService: BsModalService,
    private _reloadService: ReloadCategoriesService
  ) {}

  ngOnInit() {
    this.getProducts();
    this.reloadProduct();
    this.getCategories();
  }

  getProducts() {
    this._productService.getProducts().subscribe((data: IProduct) => {
      this.products = data;
    });
  }

  reloadProduct() {
    this._reloadService.castProd.subscribe((res: IProduct) => {
      this.products = res;
    });
  }

  getCategories() {
    this._categoryService.getCategories().subscribe((data: ICategories) => {
      this.categories = data;
    });
  }

  search() {
    if (this.searchName) {
      this.showSearch = true;
      this._productService
        .searchProduct(this.searchName)
        .subscribe((res: IProduct) => {
          return (this.products = res);
        });
    } else {
      this.resetSearch();
    }
  }

  resetSearch() {
    if (this.searchName === '') {
      this.getProducts();
    }
  }

  clearSearch() {
    this.searchName = '';
    this.resetSearch();
    this.showSearch = false;
  }

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
