import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';




@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product: Product =
    {
      id: null, prodName: '',
      prodDesc: '',
      prodPrice: null,
      updatedAt: null
    };
  isLoadingResults = false;

  constructor(
    public api: ApiService,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.getProduct();
  }
  // getting a single product
  async getProduct() {
    if (this.route.snapshot.paramMap.get('id') === 'null') {
      this.presentAlertConfirm('You are not choosing an item from the list');
    } else {
      this.isLoadingResults = true;
      await this.api.getProduct(this.route.snapshot.paramMap.get('id'))
        .subscribe(res => {
          console.log(res);
          this.product = res;
        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        });
    }
  }

  // Initializing the Alert method for not choosing any product
  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: msg,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['']);
          }
        }
      ]
    });
  }
  async deleteProduct(id: any) {
    this.isLoadingResults = true;
    await this.api.deleteProduct(id).subscribe(res => {
      this.isLoadingResults = false;
      this.router.navigate(['/home']);
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  editProduct(id: any) {
    this.router.navigate(['/product-edit', id]);
  }



}
