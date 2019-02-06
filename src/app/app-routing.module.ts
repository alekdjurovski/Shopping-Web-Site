import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/main/products/products.component';
import { CategoriesComponent } from './components/main/categories/categories.component';
import { MainComponent } from './components/main/main.component';
import { AddEditComponent } from './components/main/products/add-edit/add-edit.component';
import { PortalComponent } from './components/portal/portal.component';
import { AddEditCategoryComponent } from './components/main/categories/add-edit-category/add-edit-category.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainComponent },
  { path: 'categories', children: [
    {path: '', component: CategoriesComponent},
    { path: ':mode', component: AddEditCategoryComponent },
    { path: ':mode/:id', component: AddEditCategoryComponent }
  ] },
  { path: 'products', children: [
      { path: '', component: ProductsComponent },
      { path: ':addedit', component: AddEditComponent },
      { path: ':addedit/:id', component: AddEditComponent }
    ] },
  { path: 'portal', component: PortalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
