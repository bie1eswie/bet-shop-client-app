import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountModule } from './appviews/Account/account.module';
import { OrderCheckoutModule } from './appviews/checkout/order-checkout.module';
import { BetCommonModule } from './appviews/common/bet-common.module';
import { AppDataService } from './appviews/common/services/app-data.service';
import { DataService } from './appviews/common/services/data.service';
import { ShopModule } from './appviews/shop/shop.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './appviews/common/utilities/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BetCommonModule,
    ShopModule,
    AccountModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    OrderCheckoutModule
  ],
  providers: [
    DataService,
    AppDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
