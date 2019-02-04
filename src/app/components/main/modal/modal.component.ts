import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ReloadCategoriesService } from 'src/app/services/reload-categories.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  title: string;
  okBtnName: string;
  list: any[] = [];
  activePage: string;

  constructor(
    public bsModalRef: BsModalRef,
    private _categoryService: CategoryService,
    private _toastr: ToastrService,
    private _reloadService: ReloadCategoriesService,
    private _productService: ProductService
  ) {}

  ngOnInit() {
    this.activePage = this._productService.deleteParam;
  }
  removeCategory() {
    if (this.activePage) {
      this._productService.deleteProduct().subscribe(res => {
        this._toastr.error('Product is Successful Deleted');
      });

    } else {
      this._categoryService.deleteCategories().subscribe(res => {
        this._reloadService.getAllCategories();
        this._toastr.error('Category is Successful Deleted');
      });

    }

  }
}
