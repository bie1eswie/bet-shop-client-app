import { Component, OnInit } from '@angular/core';
import { IShoppingCard } from '../common/models/shopping-card';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  shoppingCard!: IShoppingCard | null;
  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    this.getShoppingCard();
  }
  getShoppingCard() {
    this.shoppingCard = this.checkoutService.getCurrentShoppingCardValue();
  }
  checkout(){
    this.checkoutService.checkout(this.shoppingCard);
  }
}
