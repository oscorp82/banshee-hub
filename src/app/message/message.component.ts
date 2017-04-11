import { ForumService } from './../forum/forum.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  idKey: string;
  message: any;
  newMessage: string;

  constructor(private rt: ActivatedRoute, private router: Router, private fS: ForumService) { }

  ngOnInit() {
    this.idKey = this.rt.snapshot.params['id'];
    console.log("incoming ID:",this.idKey);
    
    this.fS.getMessage(this.idKey)
      .first()
      .subscribe(msg => this.message = msg);
  }

  sendUpdate() {
    if (!this.newMessage) {
      return;
    }
    this.fS.updateMessage(this.idKey, this.newMessage);
    this.router.navigate(["/forum"]);
  }

  deleteThisMessage() {
    this.fS.deleteMessage(this.idKey);
    this.router.navigate(["/forum"]);
  }
}
