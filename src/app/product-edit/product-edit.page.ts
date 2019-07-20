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

export class ProductEditPage implements OnInit {
  productForm: FormGroup;
  id = '';
  prodName = '';
  prodDesc = '';
  prodPrice: number = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, public api: ApiService, public formBulder: FormBuilder) { }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params[`id`]);
    this.productForm = this.formBulder.group({
      prodName: [null, Validators.required],
      prodDesc: [null, Validators.required],
      prodPrice: [null, Validators.required]
    });
  }


  getProduct(id: any) {
    this.api.getProduct(id).subscribe((res: any) => {
      this.id = res.id;
      this.productForm.setValue({
        prodName: res.prodName,
        prodDesc: res.prodDesc,
        prodPrice: res.prodPrice
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateProduct(this.id, this.productForm.value).subscribe(res => {
      const resId = res.id;
      this.isLoadingResults = false;
      this.router.navigate(['/product-details', resId]);
    }, (err: any) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
  productDetail() {
    this.router.navigate(['/product-details', this.id]);
  }



}
