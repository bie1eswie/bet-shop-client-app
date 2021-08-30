import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private dataService: DataService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.dataService.GetToken();
    if (token) {
      request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    return next.handle(request);
  }
}
