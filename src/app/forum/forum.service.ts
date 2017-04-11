import { UserService } from './../shared/user.service';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './../shared/user';

@Injectable()
export class ForumService {

  constructor(private af: AngularFire, private userService: UserService) { }

  getMessages() {
    return this.af.database.list("messages")
      .map(msgs => {msgs.reverse()
        console.log("list:", msgs);
        return msgs;
      });
  }

  getMessage(msgId: string) : Observable<any> {
    console.log('messages:',`messages/${msgId}`);
    
    return this.af.database.object(`messages/${msgId}`);
  }

  addMessage(msg: string, date: Date) {
    if (!msg || !this.userService.user.uid) {
      alert("Must be signed in and typed somehting.")
      return;
    }
    const messages = this.af.database.list("messages");
    messages.push({
      uid: this.userService.user.uid,
      message: msg,
      user: this.userService.user.name,
      timeStamp: date.toISOString(),
      photoURL: this.userService.user.photoURL,
    });
    console.log('new message:', JSON.stringify({
      uid: this.userService.user.uid,
      message: msg,
      user: this.userService.user.name,
      timeStamp: date.toISOString(),
      photoURL: this.userService.user.photoURL,
    }));
    
  }

  updateMessage(key: string, msg: string) {
    const message = this.af.database.object(`messages/${key}`);
    message.update({
      message: msg,
    })
  }

  deleteMessage(key: string)
  {
    const message = this.af.database.object(`messages/${key}`);
    message.remove();
  }
}
