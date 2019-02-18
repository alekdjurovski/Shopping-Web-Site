import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './components/main/products/products.component';
import { CategoriesComponent } from './components/main/categories/categories.component';
import { CategoryService } from './services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {
//   MatButtonModule,
//   MatCheckboxModule,
//   MatFormFieldModule,
//   MatSelectModule,
//   MatInputModule
// } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalComponent } from './components/main/modal/modal.component';
import { ReloadCategoriesService } from './services/reload-categories.service';
import { AddEditComponent } from './components/main/products/add-edit/add-edit.component';
import { ProductService } from './services/product.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';
import { PortalComponent } from './components/portal/portal.component';
import { AddEditCategoryComponent } from './components/main/categories/add-edit-category/add-edit-category.component';
import { ViewProductComponent } from './components/portal/view-product/view-product.component';
import { ProductListComponent } from './components/portal/product-list/product-list.component';
import { HeaderNavComponent } from './components/portal/header-nav/header-nav.component';
import { CartComponent } from './components/portal/cart/cart.component';
import { FooterComponent } from './components/portal/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    CategoriesComponent,
    SidebarComponent,
    MainComponent,
    ModalComponent,
    AddEditComponent,
    PortalComponent,
    AddEditCategoryComponent,
    ViewProductComponent,
    ProductListComponent,
    HeaderNavComponent,
    CartComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // MatCheckboxModule,
    // MatButtonModule,
    // MatFormFieldModule,
    // MatSelectModule,
    // MatInputModule,
    CommonModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-right'}),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.fireBaseConfig),
    AngularFireDatabaseModule,
    NgxPaginationModule
  ],
  providers: [CategoryService, ReloadCategoriesService, ProductService],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule {}
