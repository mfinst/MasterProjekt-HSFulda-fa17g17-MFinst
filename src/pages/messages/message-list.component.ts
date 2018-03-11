import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-component',
  template: '<div *ngIf="hasMessages">' +
  '      <ion-card *ngFor="let message of messages">\n' +
  '        <ion-item>\n' +
  '          <h2>{{message.Titel}} + {{message.absender_email}}</h2>\n' +
  '        </ion-item>\n' +
  '      <ion-card-content>\n' +
  '{{message.nachricht}}' +
  '      </ion-card-content>\n' +
  '      <ion-row>\n' +
  '        <ion-col> {{message.date}}</ion-col>\n' +
  '        <ion-col>' +
  '         <ion-fab style="position: absolute; bottom: 25px; right: 25px;">\n' +
  '          <button ion-fab (click)="writeNewMessage()">\n' +
  '           <ion-icon name="ios-add"></ion-icon>\n' +
  '          </button>\n' +
  '         </ion-fab>\n' +
  '        </ion-col>\n' +
  '      </ion-row>\n' +
  '      </ion-card>\n' +
  '</div>' +
  '<div *ngIf="!hasMessages"> No Messages! </div>' +
  ''
})
export class MessagesListComponent {
  @Input('messages') messages = [];
  @Input() message: string;
  hasMessages = false;
  constructor() {
    if(this.messages.length != 0) {
      this.hasMessages = true
    }
    console.log('loaded new component')
    console.log(this.messages)
    console.log(this.message);
  }

  writeNewmessage() {

  }
}
