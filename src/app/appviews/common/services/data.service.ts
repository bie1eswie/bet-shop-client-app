import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppDataService } from './app-data.service';

@Injectable()
export class DataService {
    constructor(private http: HttpClient, private _sessionStore: AppDataService) {
     }

     getPromise(url: string) {
      return this.http.get(url);
    }

    postPromise(url: string, data: any){
      return this.http.post(url, data)
    }

    get(url: string): Observable<any> {
        let headers = this.setHeaders();
        return this.http.get(url, {headers})
            .pipe(
                tap((res: any) => {
                    return res;
                }),
                catchError(this.handleError)
            );
    }

    postWithId(url: string, data: any, params?: any): Observable<any> {
        return this.doPost(url, data, true, params);
    }

    post(url: string, data: any, params?: any): Observable<any> {
        return this.doPost(url, data, false, params);
    }

    putWithId(url: string, data: any, params?: any): Observable<any> {
        return this.doPut(url, data, true, params);
    }

    private doPost(url: string, data: any, needId: boolean, params?: any): Observable<any> {
        return this.http.post(url, data)
            .pipe(
                tap((res: any) => {
                    return res;
                }),
                catchError(this.handleError)
            );
    }

    delete(url: string, params?: any) {
      let headers = this.setHeaders();
        this.http.delete(url, {headers})
            .subscribe((res) => {console.log('deleted');
        });
    }

    private handleError(error: any) {
        if (error.error instanceof ErrorEvent) {
            console.error('Client side network error occurred:', error.error.message);
        } else {
            console.error('Backend - ' +
                `status: ${error.status}, ` +
                `statusText: ${error.statusText}, ` +
                `message: ${error.error.message}`);
        }
        return throwError(error || 'server error');
    }

    private doPut(url: string, data: any, needId: boolean, params?: any): Observable<any> {
      let headers = this.setHeaders();
        return this.http.put(url, data, {headers})
            .pipe(
                tap((res: any) => {
                    return res;
                }),
                catchError(this.handleError)
            );
    }

    private setHeaders() :HttpHeaders{
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.GetToken());
        return headers;
    }

    public GetToken(): any {
      let token = this._sessionStore.retrieve('authorizationData');
      return token;
  }
}

