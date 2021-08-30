import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICatalog } from '../common/models/catalog';
import { DataService } from '../common/services/data.service';
import { Constants } from '../common/utilities/constants';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private _productAPI = Constants.ServerURL + '/api/product';
  pageNumber!: number;
  constructor(private dataService: DataService) {
    this.pageNumber = 1;
  }

  setPageNumber(pageNumber:number){
    this.pageNumber= pageNumber
  }

  getPageNumber(){
      return this.pageNumber;
  }

  getCatalog(pageIndex: number, pageSize: number): Observable<ICatalog> {
    let url = this._productAPI;
    url = url + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize;

    return this.dataService.get(url).pipe<ICatalog>(
      tap((response: ICatalog) => {
        return response;
      })
    );
  }
}
