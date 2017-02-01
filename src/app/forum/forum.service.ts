import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ForumService {

  constructor(private af: AngularFire) { }
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

  addMessage(msg: string, usr: string, date: Date) {
    if (!msg || !usr) {
      return;
    }
    const messages = this.af.database.list("messages");
    messages.push({
      message: msg,
      user: usr,
      timeStamp: date.toISOString()
    });
    console.log('new message:', JSON.stringify({
      message: msg,
      user: usr,
      timeStamp: date
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
