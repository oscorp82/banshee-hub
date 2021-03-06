import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
  static NO_LOGIN = new User();
  private userSubject: BehaviorSubject<User> = new BehaviorSubject(UserService.NO_LOGIN);
  public user$: Observable<User> = this.userSubject.asObservable();
  public user: User;

  constructor(private af: AngularFire) {
    this.af.auth
      .do(login => {
        if (login && login.auth && login.uid) {
          var timeStamp = new Date();
          const log = this.af.database.list("user-log");
          log.push({
            type: "login",
            userName: login.auth.displayName,
            dateTimeStamp: timeStamp.toISOString()
          });
        }
      })
      .subscribe(login => {
        if (login && login.auth && login.uid) {
          var newUser = new User();
          newUser.uid = login.auth.uid;
          newUser.email = login.auth.email;
          newUser.name = login.auth.displayName;
          newUser.photoURL = login.auth.photoURL;
        } else {
          var newUser = UserService.NO_LOGIN;
        }
        this.user = newUser;
        this.userSubject.next(newUser);
      });
  }

  login() {
    console.log("UserService login");
    this.af.auth.login();
  }

  logout() {
    console.log("UserService logout");
    this.af.auth.logout();
  }

  logLogout(userName: string) {
    var timeStamp = new Date();
    const log = this.af.database.list("user-log");
    log.push({
      type: "logout",
      userName: userName,
      dateTimeStamp: timeStamp.toISOString()
    });
  }

}
