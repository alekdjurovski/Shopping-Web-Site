import { Component, OnInit, Input } from '@angular/core';
import { ICategories } from '../../../model/category';
import { CategoryService } from '../../../services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any;
  searchName: string;
  showSearch = false;


  constructor(private _service: CategoryService,
              private _toastr: ToastrService) {}

  ngOnInit() {
    this.getCategories();
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

  removeCategory(id) {
    if (confirm('Are you sure you want to perform this action?')) {
      this._service.deleteCategories(id).subscribe(res => {
        this.getCategories();
        this._toastr.success('Hello world!', 'Toastr fun!');
      });
    }
  }
}
