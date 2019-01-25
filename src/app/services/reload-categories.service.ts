import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ReloadCategoriesService {
  private categories = new BehaviorSubject<any>([]);
  cast = this.categories.asObservable();

  constructor(private _service: CategoryService) {}

  getAllCategories() {
    this._service.getCategories().subscribe(data => {
      this.categories.next(data);
    });
  }
}
