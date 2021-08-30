import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule   }   from '@angular/forms';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { AccountService } from './account.service';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AccountLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
  ],
  providers: [AccountService]
})
export class AccountModule { }
