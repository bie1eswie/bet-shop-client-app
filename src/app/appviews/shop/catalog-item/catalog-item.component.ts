import { Component, Input, OnInit } from '@angular/core';
import { CheckoutService } from '../../checkout/checkout.service';
import { IProduct } from '../../common/models/product';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss']
})
export class CatalogItemComponent implements OnInit {
  @Input()
  product!: IProduct;
  constructor(private checkoutService: CheckoutService) {

   }

  ngOnInit(): void {
  }

  addToCard() {
    this.checkoutService.addItemToCurrentShoppingCard(this.product);
  }

}
