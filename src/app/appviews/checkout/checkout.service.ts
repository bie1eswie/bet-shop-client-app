import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IShoppingCard } from '../common/models/shopping-card';
import { AppDataService } from '../common/services/app-data.service';
import { DataService } from '../common/services/data.service';
import { Constants } from '../common/utilities/constants';
import { tap } from 'rxjs/operators';

import { IProduct } from '../common/models/product';
import { OrderCheckoutModule } from './order-checkout.module';
import { ICardItem } from '../common/models/card-item';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private currentShoppingCard = new BehaviorSubject<IShoppingCard | null>(null);
  shoppingCard$ = this.currentShoppingCard.asObservable();
  private shoppingCardAPI = Constants.ServerURL + '/api/shoppingCard';
  private checkoutAPI = Constants.ServerURL + '/api/ordering';
  constructor(private dataService: DataService,private appDataService: AppDataService)
  {

  }

  getShoppingCard(id: string) : Observable<IShoppingCard> {
    return this.dataService.get(this.shoppingCardAPI + '?id=' + id)
      .pipe<IShoppingCard>(
        tap((shoppingCard: IShoppingCard) => {
          this.currentShoppingCard.next(shoppingCard);
          return shoppingCard;
        }));

  }

  createShoppingCard() : Observable<IShoppingCard> {
    return this.dataService.get(this.shoppingCardAPI)
      .pipe<IShoppingCard>(tap((shoppingCard: IShoppingCard) => {
        this.currentShoppingCard.next(shoppingCard);
        return shoppingCard;
      }));
  }

  updateShoppingCard(shoppingCard: IShoppingCard) : Observable<IShoppingCard> {
    return this.dataService.post(this.shoppingCardAPI, shoppingCard)
    .pipe<IShoppingCard>(tap((shoppingCard: IShoppingCard) => {
      this.currentShoppingCard.next(shoppingCard);
      return shoppingCard;
    }));
  }

  getCurrentShoppingCardValue() {
    return this.currentShoppingCard.value;
  }

  createCard(item: ICardItem, quantity = 1) {
    return this.dataService.getPromise(this.shoppingCardAPI)
          .subscribe((response: any) => {
            // This will update the BehaviorSubject withnew value
            response.cardItems = this.addOrUpdateItem(response.cardItems, item, quantity);
            this.currentShoppingCard.next(response);
            console.log(JSON.stringify(response));
          }, (error) => console.log(error));
  }

  addItemToCurrentShoppingCard(item: IProduct, quantity = 1) {
    const shoppingCard = this.getCurrentShoppingCardValue();
    const cardItem = this.cloenCardItem(item,quantity);
    if(shoppingCard == null) {

      this.createCard(cardItem,quantity);
    }
    else{
      shoppingCard.cardItems = this.addOrUpdateItem(shoppingCard.cardItems, cardItem, quantity);
    }
  }

  checkout(values: any) {
    return this.dataService.postPromise(this.checkoutAPI,values)
    .subscribe((response: any) => {
      console.log(JSON.stringify(response));
    }, (error) => console.log(error));
  }

  private cloenCardItem(item: IProduct, quantity: number): ICardItem {
    return {
      name: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity : quantity,
      productId : item.id
    };
  }

  private addOrUpdateItem(items: ICardItem[], itemToAdd: ICardItem, quantity: number): ICardItem[] {
    const index = items.findIndex(i => i.productId === itemToAdd.productId);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }
}
