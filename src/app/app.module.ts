import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/admin-panel/header/header.component';
import { ProductsComponent } from './components/admin-panel/products/products.component';
import { CategoriesComponent } from './components/admin-panel/categories/categories.component';
import { CategoryService } from './services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/admin-panel/sidebar/sidebar.component';
import { MainComponent } from './components/admin-panel/admin-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalComponent } from './components/modal/modal.component';
import { ReloadService } from './services/reload.service';
import { AddEditComponent } from './components/admin-panel/products/add-edit/add-edit.component';
import { ProductService } from './services/product.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';
import { PortalComponent } from './components/portal/portal.component';
import { AddEditCategoryComponent } from './components/admin-panel/categories/add-edit-category/add-edit-category.component';
import { ViewProductComponent } from './components/portal/view-product/view-product.component';
import { ProductListComponent } from './components/portal/product-list/product-list.component';
import { HeaderNavComponent } from './components/portal/header-nav/header-nav.component';
import { CartComponent } from './components/portal/cart/cart.component';
import { FooterComponent } from './components/portal/footer/footer.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxLoadingModule } from 'ngx-loading';
import { LoginComponent } from './components/shared/login/login.component';
import { RegistrationComponent } from './components/shared/registration/registration.component';

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
    FooterComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-right'}),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.fireBaseConfig),
    AngularFireDatabaseModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [CategoryService, ReloadService, ProductService],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule {}
