import { Component, Input } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { ResthandlerProvider } from '../../providers/resthandler/resthandler';
import { MessageModel } from '../../providers/resthandler/msg.model';
import { WriteModalPage } from '../write-modal/write-modal';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
  styleUrls: ['/src/pages/messages']
})
export class MessagesPage {
  messages: MessageModel[];
  subject = 'KaufenMieten'
  buySellMsgs = [];
  inspecMsgs = [];
  infoMsgs = [];
  otherMsgs = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public restHandler: ResthandlerProvider,
              public modalCtrl: ModalController,
              public authService: AuthServiceProvider) {
    const initialMsg = new MessageModel();
    initialMsg.msg = ' ';
    initialMsg.receiverNick = ' ';
    initialMsg.topic = ' ';
    initialMsg.imgUrls = [' ']
    this.messages = [initialMsg];
    // Load Messages
    this.loadMessages();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

  loadMessages() {
    this.restHandler.getMessages('date', '').subscribe((response: any) => {
      const forUser = response.FORUser;
      for (let msg of forUser) {
        switch (msg.nachricht_beschreibung) {
          case 'KaufenMieten':
            this.buySellMsgs.push(msg);
            break;
          case 'Besichtigung':
            this.inspecMsgs.push(msg);
            break;
          case 'Information':
            this.infoMsgs.push(msg);
            break;
          case 'Anderer':
            this.otherMsgs.push(msg);
            break;
          default:
        }
      }
      const fromUser = response.FROMUser;
      for (let msg of fromUser) {
        switch (msg.nachricht_beschreibung) {
          case 'KaufenMieten':
            this.buySellMsgs.push(msg);
            break;
          case 'Besichtigung':
            this.inspecMsgs.push(msg);
            break;
          case 'Information':
            this.infoMsgs.push(msg);
            break;
          case 'Anderer':
            this.otherMsgs.push(msg);
            break;
          default:
        }
      }
      this.buySellMsgs.sort((a, b)=>{
        if(a.id >= b.id) {
          return -1;
        }
        return +1;
      });
      this.inspecMsgs.sort((a, b)=>{
        if(a.id >= b.id) {
          return -1;
        }
        return +1;
      });
      this.infoMsgs.sort((a, b)=>{
        if(a.id >= b.id) {
          return -1;
        }
        return +1;
      })
      this.otherMsgs.sort((a, b)=>{
        if(a.id >= b.id) {
          return -1;
        }
        return +1;
      })
    })
  }

  writeNewMessage() {
    let writeModal = this.modalCtrl.create(WriteModalPage);
    writeModal.onDidDismiss((data) => {
      if(data != undefined) {
        this.submitMessage(data);
      }
    });
    writeModal.present();
  }

  answerMessage(message: MessageModel) {
    let writeModal = this.modalCtrl.create(WriteModalPage, {message: message});
    writeModal.onDidDismiss((data) => {
      this.submitMessage(data);
    })
    writeModal.present();
  }

  submitMessage(message: MessageModel) {
    // callback
    const subscription = this.restHandler.sendMessage(message).subscribe((response) => {
      if(response === undefined) {
        this.presentToast('Message successfully sent!', 750);
      }
      subscription.unsubscribe();
    }, (error) => {
      this.presentToast('An Error occurred!', 750);
      subscription.unsubscribe();
    });
  }

  /**
   * zeigt ein Toast an
   * @param {string} text = Nachricht des Toast
   * @param {number} duration = Dauer des Toast in ms; aber nicht länger als 3 Sekunden
   */
  presentToast(text: string, duration: number) {
    if (duration > 3000) {
      duration = 3000;
    }
    let toast = this.toastCtrl.create({
      message: text,
      duration: duration,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.present();
  }

}

@Component({
  selector: 'app-list-component',
  template: '<div *ngIf="hasMessages">' +
  '      <ion-card *ngFor="let message of messages">\n' +
  '        <ion-item>\n' +
  '          <h2>{{message.Titel}} + {{message.absender_email}}</h2>\n' +
  '        </ion-item>\n' +
  '      </ion-card>\n' +
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
    console.log('loaded')
    console.log(this.messages)
    console.log(this.message);
  }
}
