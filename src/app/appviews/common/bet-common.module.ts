import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './pagination/pagination.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BetshoplayoutComponent } from './betshoplayout/betshoplayout.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    PagerComponent,
    FooterComponent,
    HeaderComponent,
    BetshoplayoutComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    AppRoutingModule
  ],
  exports: [
    PaginationModule,
    PagerComponent,
    FooterComponent,
    HeaderComponent,
    NavigationComponent,
    BetshoplayoutComponent
  ]
})
export class BetCommonModule { }
