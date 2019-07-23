import { Component, OnInit, OnDestroy } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
import { ApiService } from "../api.service";
import { Product } from "../product";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Subscription, of } from 'rxjs';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit, OnDestroy {
  products: Product[] = [];
  routeSub;
  constructor(
    public api: ApiService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    // getting the products when the component is created
    this.routeSub = this.router.events.subscribe(() => {
      console.log(this.routeSub);
      this.getProducts();
    });
  }
  async getProducts() {
    const loading = await this.loadingController.create({
      message: "Loading..."
    });
    await loading.present();
    await this.api.getProducts().subscribe(
      res => {
        this.products = res;
        console.log(this.products);
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  addProduct() {
    this.router.navigate(['/product-add']);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.products, event.previousIndex, event.currentIndex);
  }
  public ngOnDestroy() {
    this.routeSub.unsubscribe();
  }


}
