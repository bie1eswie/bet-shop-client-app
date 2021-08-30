import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CardItemComponent } from './card-item/card-item.component';
import { CheckoutService } from './checkout.service';
import { BetCommonModule } from '../common/bet-common.module';



@NgModule({
  declarations: [
    CheckoutComponent,
    CardItemComponent
  ],
  imports: [
    CommonModule,
    BetCommonModule
  ],
  exports: [
    CheckoutComponent,
    CardItemComponent
  ],
  providers: [CheckoutService]
})
export class OrderCheckoutModule { }
