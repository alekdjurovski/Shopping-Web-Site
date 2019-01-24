import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './components/main/products/products.component';
import { CategoriesComponent } from './components/main/categories/categories.component';
import { CategoryService } from './services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainComponent } from './components/main/main.component';
import { AddNewComponent } from './components/main/add-new/add-new.component';
import { EditComponent } from './components/main/edit/edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalComponent } from './components/main/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    CategoriesComponent,
    SidebarComponent,
    MainComponent,
    AddNewComponent,
    EditComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-center'}),
    AlertModule.forRoot(),
    ModalModule.forRoot()
    ],
  providers: [
    CategoryService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ ModalComponent ]
})
export class AppModule { }
