import { Component, OnInit, Input } from '@angular/core';
import { ICategories } from '../../../model/category';
import { CategoryService } from '../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { ReloadCategoriesService } from 'src/app/services/reload-categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any;
  searchName: string;
  showSearch = false;
  bsModalRef: BsModalRef;

  constructor(private _service: CategoryService,
              private _toastr: ToastrService,
              private modalService: BsModalService,
              private _reloadService: ReloadCategoriesService) {}

  ngOnInit() {
    this.getCategories();
    this._reloadService.cast.subscribe(data => {
      this.categories = data;
    });
      }

  getCategories() {
    this._service.getCategories().subscribe(data => {
      this.categories = data;
      this.categories.id = this._service.addId;
      this._service.categoriesList = data;
    });
  }

  search() {
    if (this.searchName) {
      this.showSearch = true;
      this._service.searchCategories(this.searchName).subscribe(res => {
        return (this.categories = res);
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

  editCategory(id) {
    this._service.editId = id;
  }

  openModalWithComponent(id) {
    this._service.deleteId = id;
    const initialState = {
      list: [
        'Are you sure you want to perform this action?'
      ],
      title: 'Delete category'
    };
    this.bsModalRef = this.modalService.show(ModalComponent, {initialState});
    this.bsModalRef.content.okBtnName = 'Ok';
  }

}
