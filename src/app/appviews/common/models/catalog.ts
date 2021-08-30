import { IProduct } from "./product";

export interface ICatalog {
  pageIndex: number;
  products: IProduct[];
  pageSize: number;
  count: number;
}
