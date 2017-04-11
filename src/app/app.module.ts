import { UserService } from './shared/user.service';
import { ForumService } from './forum/forum.service';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';;
import { RouterModule } from '@angular/router';
import 'hammerjs';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';
import { ForumComponent } from './forum/forum.component';
import { MessageComponent } from './message/message.component';


  // Initialize Firebase
  var firebaseDatabaseConfig = {
    apiKey: "AIzaSyAvsgOGsbZn6qVn8Wl1Q6yeBShpi1vUg44",
    authDomain: "bansheehub.firebaseapp.com",
    databaseURL: "https://bansheehub.firebaseio.com",
    storageBucket: "bansheehub.appspot.com",
    messagingSenderId: "458719051374"
  };

  const firebaseAuthConfig = {
    provider: AuthProviders.Google,
    method: AuthMethods.Redirect
  };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ForumComponent,
    MessageComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseDatabaseConfig, firebaseAuthConfig),
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot([
      { path: "forum", children:[
        {path: "", component: ForumComponent},
        {path: ":id", component: MessageComponent},
      ] },
      { path: "**", component: HomeComponent },
    ]),
  ],
  providers: [ForumService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
