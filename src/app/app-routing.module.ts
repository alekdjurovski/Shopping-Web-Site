import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/main/products/products.component';
import { CategoriesComponent } from './components/main/categories/categories.component';
import { MainComponent } from './components/main/main.component';
import { AddNewComponent } from './components/main/add-new/add-new.component';
import { EditComponent } from './components/main/edit/edit.component';
import { AddEditComponent } from './components/main/products/add-edit/add-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'add', component: AddNewComponent},
  { path: 'edit', component: EditComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'add-edit-product', component: AddEditComponent },
  { path: 'products', children: [
      { path: '', component: ProductsComponent },
      { path: ':addedit', component: AddEditComponent },
      { path: ':addedit/:id', component: AddEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
