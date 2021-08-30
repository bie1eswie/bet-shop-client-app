import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './appviews/Account/account-layout/account-layout.component';
import { LoginComponent } from './appviews/Account/login/login.component';
import { RegisterComponent } from './appviews/Account/register/register.component';
import { CheckoutComponent } from './appviews/checkout/checkout.component';
import { BetshoplayoutComponent } from './appviews/common/betshoplayout/betshoplayout.component';
import { AuthGuard } from './appviews/common/utilities/auth.guard';
import { ProductCatalogComponent } from './appviews/shop/product-catalog/product-catalog.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '', component: AccountLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: '', component: BetshoplayoutComponent,
    children: [
      { path: 'shop',canActivate: [AuthGuard], component: ProductCatalogComponent },
      { path: 'checkout', canActivate: [AuthGuard], component: CheckoutComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
