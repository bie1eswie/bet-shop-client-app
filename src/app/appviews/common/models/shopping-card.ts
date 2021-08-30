import { ICardItem } from './card-item';

export interface IShoppingCard {
  id: number;
  userId: number
  cardItems: ICardItem[];
}
