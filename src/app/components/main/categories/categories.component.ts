import { Component, OnInit, Input } from '@angular/core';
import { ICategories } from '../../../model/category';
import { CategoryService } from '../../../services/category.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { ReloadCategoriesService } from 'src/app/services/reload-categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: ICategories;
  searchName: string;
  bsModalRef: BsModalRef;

  constructor(
    private _service: CategoryService,
    private modalService: BsModalService,
    private _reloadService: ReloadCategoriesService
  ) {}

  ngOnInit() {
    this.getCategories();
this.reloadCategoties();
  }

  getCategories() {
    this._service.getCategories().subscribe((data: ICategories) => {
      this.categories = data;
      this._service.categoriesList = data;
    });
  }
  reloadCategoties() {
    this._reloadService.cast.subscribe((res: ICategories) => {
      this.categories = res;
    });
  }

  search() {
    if (this.searchName) {
      this._service.searchCategories(this.searchName).subscribe((res: ICategories) => {
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

  openModalWithComponent(id) {
    this._service.deleteId = id;
    const initialState = {
      list: ['Are you sure you want to perform this action?'],
      title: 'Delete category'
    };
    this.bsModalRef = this.modalService.show(ModalComponent, { initialState });
    this.bsModalRef.content.okBtnName = 'Ok';
  }
}
