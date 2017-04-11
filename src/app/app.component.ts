import { UserService } from './shared/user.service';
import { User } from './shared/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Banshee Hub';
  user: User;

  constructor(private userService: UserService) {

  }
  ngOnInit() {
    this.userService.user$
      .subscribe(user => this.user = user);
  }

  login() {
    console.log("Login button pressed");
    this.userService.login();
  }
  logout() {
    console.log("Logout button pressed");
    this.userService.logout();
    this.userService.logLogout(this.user.name);
  }
}
