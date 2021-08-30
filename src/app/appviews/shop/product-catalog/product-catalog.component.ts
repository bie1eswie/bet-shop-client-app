import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../common/models/product';
import { Constants } from '../../common/utilities/constants';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss'],
})
export class ProductCatalogComponent implements OnInit {
  products!: IProduct[];
  totalCount!: number;
  pageSize!: number;
  pageNumber!: number;
  constructor(private shopService: ShopService) {
    this.pageSize = Constants.ProductCatalogPageSize;
  }

  ngOnInit(): void {
    this.getProducts(0,10);
  }

  getProducts(pageIndex: number, pageSize: number) {
    this.shopService.getCatalog(pageIndex, pageSize).subscribe(
      (res) => {
        this.products = res.products;
        this.totalCount = res.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onPageChanged(event: any) {
    var pageNum = this.shopService.getPageNumber();
    if (pageNum !== event)
    {
       const pageNumber = event;
       this.shopService.setPageNumber(pageNumber);
       this.pageNumber = pageNumber;
       this.getProducts(pageNumber - 1,this.pageSize);
    }
   }
}
