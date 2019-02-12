import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/main/products/products.component';
import { CategoriesComponent } from './components/main/categories/categories.component';
import { MainComponent } from './components/main/main.component';
import { AddEditComponent } from './components/main/products/add-edit/add-edit.component';
import { PortalComponent } from './components/portal/portal.component';
import { AddEditCategoryComponent } from './components/main/categories/add-edit-category/add-edit-category.component';
import { ViewProductComponent } from './components/portal/view-product/view-product.component';
import { CartComponent } from './components/portal/cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/portal', pathMatch: 'full' },
  { path: 'home', component: MainComponent },
  {
    path: 'categories',
    children: [
      { path: '', component: CategoriesComponent },
      { path: ':mode', component: AddEditCategoryComponent },
      { path: ':mode/:id', component: AddEditCategoryComponent }
    ]
  },
  {
    path: 'products',
    children: [
      { path: '', component: ProductsComponent },
      { path: ':addedit', component: AddEditComponent },
      { path: ':addedit/:id', component: AddEditComponent }
    ]
  },
  {
    path: 'portal',
    children: [
      { path: '', component: PortalComponent },
      { path: 'view/:id', component: ViewProductComponent }
    ]
  },
  { path: 'view/:id', component: ViewProductComponent },
  { path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
