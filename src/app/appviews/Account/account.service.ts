import { Injectable } from '@angular/core';
import { DataService } from '../common/services/data.service';
import { Constants } from '../common/utilities/constants';
import { map } from 'rxjs/operators';
import { IUser } from '../common/models/user';
import { AppDataService } from '../common/services/app-data.service';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private registrationAPI = Constants.ServerURL + '/api/account/register';
  private loginAPI = Constants.ServerURL + '/api/account/login';
  private userCheckAPI = Constants.ServerURL + '/api/account/userexists';
  // current applicationUser
  private currUserStore = new ReplaySubject<IUser>(1);
  currentUser$ = this.currUserStore.asObservable();

  constructor(private dataService: DataService,private appDataService: AppDataService) { }

  isLoggedIn() : boolean {
    const token = this.dataService.GetToken(); // get token from local storage
    const payload = atob(token.split('.')[1]); // decode payload of token
    const parsedPayload = JSON.parse(payload); // convert payload into an Object

    return parsedPayload.exp > Date.now() / 1000; // check if token is expired

  }

  login(values: any) {
    this.appDataService.store('authorizationData','');
    return this.dataService.post(this.loginAPI, values).pipe(
      map((user: IUser) => {
        if (user) {
          this.appDataService.store('authorizationData',user.token);
          this.currUserStore.next(user)
        }
      })
    );
  }

  register(values: any) {
    this.appDataService.store('authorizationData','');
    return this.dataService.post(this.registrationAPI, values).pipe(
      map((user: IUser) => {
        if (user) {
          this.appDataService.store('authorizationData', user.token);
          this.currUserStore.next(user)
        }
      })
    );
  }
  checkUserExists(email: string) {
    return this.dataService.get(this.userCheckAPI + '?email=' + email);
  }
}
