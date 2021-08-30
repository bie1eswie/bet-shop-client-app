import { Component, Input, OnInit } from '@angular/core';
import { ICardItem } from '../../common/models/card-item';
import { IProduct } from '../../common/models/product';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {
  @Input()
  product!: ICardItem;
  constructor() { }

  ngOnInit(): void {
  }

}
