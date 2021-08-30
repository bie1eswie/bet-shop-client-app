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
