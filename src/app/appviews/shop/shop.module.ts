import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { CatalogItemComponent } from './catalog-item/catalog-item.component';
import { BetCommonModule } from '../common/bet-common.module';
import { ShopService } from './shop.service';
import { CheckoutService } from '../checkout/checkout.service';

@NgModule({
  declarations: [
    ProductCatalogComponent,
    CatalogItemComponent
  ],
  imports: [
    CommonModule,
    BetCommonModule
  ],
  exports: [
    ProductCatalogComponent,
    CatalogItemComponent
  ],
  providers: [ShopService]
})
export class ShopModule { }
