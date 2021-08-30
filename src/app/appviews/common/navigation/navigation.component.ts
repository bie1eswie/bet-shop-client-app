import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckoutService } from '../../checkout/checkout.service';
import { IShoppingCard } from '../models/shopping-card';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  shoppingCard$!: Observable<IShoppingCard | null>;
  constructor(private shoppingCardService: CheckoutService, private router: Router) { }

  ngOnInit(): void {
    this.shoppingCard$ = this.shoppingCardService.shoppingCard$;
  }

  checkoutClick()
  {
    this.router.navigateByUrl('/checkout');
  }
}
