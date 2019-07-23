import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/* Error when invalid control is dirty, touched , or submitted */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit {

  productForm: FormGroup;
  prodName = '';
  prodDesc = '';
  prodPrice: number = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();


  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      prodName: [null, Validators.required],
      prodDesc: [null, Validators.required],
      prodPrice: [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addProduct(this.productForm.value).subscribe((res) => {
      const _id = res._id;
      this.isLoadingResults = false;
      this.router.navigate(['/product-detail', _id]);
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }



}
