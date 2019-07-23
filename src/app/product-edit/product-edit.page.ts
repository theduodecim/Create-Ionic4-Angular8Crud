import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormGroupDirective, FormBuilder, NgForm, Validators, FormControl, FormControlDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ApiService } from '../api.service';

/** Error when invalid control is dirty, touched , or submitted */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.page.html',
  styleUrls: ['./product-edit.page.scss'],
})
// tslint:disable:variable-name
export class ProductEditPage implements OnInit {
  productForm: FormGroup;
  _id = '';
  prodName = '';
  prodDesc = '';
  prodPrice: number = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, public api: ApiService, public formBulder: FormBuilder) { }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params[`_id`]);
    this.productForm = this.formBulder.group({
      prodName: [null, Validators.required],
      prodDesc: [null, Validators.required],
      prodPrice: [null, Validators.required]
    });
  }



  getProduct(_id: any) {
    this.api.getProduct(_id).subscribe((res: any) => {
      this._id = res._id;
      this.productForm.setValue({
        prodName: res.prodName,
        prodDesc: res.prodDesc,
        prodPrice: res.prodPrice
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateProduct(this._id, this.productForm.value).subscribe(res => {
      const resId = res._id;
      this.isLoadingResults = false;
      this.router.navigate(['/product-detail', resId]);
    }, (err: any) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
  productDetail() {
    this.router.navigate(['/product-detail', this._id]);
  }



}
