import { ForumService } from './forum.service';
import { Component, OnInit } from '@angular/core';
import {  } from '@angular/time-stamp';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  messages: any;
  newMessage: string;
  userN: string;
  dateTimestamp: Date;

  constructor(private fs: ForumService) { }

  ngOnInit() {
    this.messages = this.fs.getMessages().
      map(messages => {
        messages.forEach(message => {
          message.timeStamp = new Date(message.timeStamp).toLocaleString();
        });
        return messages;
      });
  }

  sendMessage() {
    this.dateTimestamp = new Date();
    console.log(this.dateTimestamp);    
    this.fs.addMessage(this.newMessage, this.dateTimestamp);
    this.newMessage = '';
  }

}
