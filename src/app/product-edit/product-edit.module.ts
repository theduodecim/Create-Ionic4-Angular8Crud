import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ProductEditPage } from './product-edit.page';
import {
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatTableModule,
  MatButtonModule, MatFormFieldModule, MatCardModule
} from '@angular/material';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
const routes: Routes = [
  {
    path: '',
    component: ProductEditPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductEditPage]
})
export class ProductEditPageModule { }
