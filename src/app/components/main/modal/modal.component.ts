import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ReloadCategoriesService } from 'src/app/services/reload-categories.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  title: string;
  okBtnName: string;
  list: any[] = [];

  constructor(
    public bsModalRef: BsModalRef,
    private _service: CategoryService,
    private _toastr: ToastrService,
    private _reloadService: ReloadCategoriesService
  ) {}

  ngOnInit() {}
  removeCategory() {
    this._service.deleteCategories().subscribe(res => {
      this._reloadService.getAllCategories();
      this._toastr.error('The Category is Successful Deleted');
    });
  }
}
