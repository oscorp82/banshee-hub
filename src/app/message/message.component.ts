import { ForumService } from './../forum/forum.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  id: string;
  message: any;
  newMessage: string;

  constructor(private rt: ActivatedRoute, private router: Router, private fS: ForumService) { }

  ngOnInit() {
    this.id = this.rt.snapshot.params['id'];
    this.fS.getMessage(this.id)
      //.first()
      .subscribe(msg => this.message = msg);
  }

  sendUpdate() {
    if (!this.newMessage) {
      return;
    }
    this.fS.updateMessage(this.id, this.newMessage);
  }

  deleteThisMessage() {
    this.fS.deleteMessage(this.id);
    this.router.navigate(["/forum"]);
  }
}
