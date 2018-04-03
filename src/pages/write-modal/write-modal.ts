import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, Platform, ViewController } from 'ionic-angular';
import { MessageModel } from '../../providers/resthandler/msg.model';
import { NgForm } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-write-message',
  templateUrl: 'write-modal.html',
})
export class WriteModalPage {
  metadata: {title:string, message:string, subjectSelector:string, topic:string, receiverNick: string}
  title = '';
  message : MessageModel;
  subjectSelector = 'KaufenMieten';
  topic = '';
  receiverNick: string;
  @ViewChild('msgFormular') form: NgForm;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public authService: AuthServiceProvider
  ) {}

  ionViewDidLoad() {
    // Füllt die Properties für Antwortnachrichten
    if(this.params.get('message') === undefined) {
      this.title = 'New Message';
    } else{
      const previous = this.params.get('message');
      this.subjectSelector = previous.nachricht_beschreibung;
      this.topic = previous.Titel;
      this.receiverNick = previous.absender_email;
      console.log(this.subjectSelector + ' ' + this.topic + ' ' + this.receiverNick)
      this.title = 'Response to ' + previous.absender_email;
      this.metadata = {
        title: '',
        message: '',
        subjectSelector: 'KaufenMieten',
        topic: previous.Titel,
        receiverNick: previous.absender_email
      }
      console.log(this.metadata)
    }
    this.message = new MessageModel()
  }

  send() {
    this.setMessage();
    this.dismiss();
  }

  setMessage() {
    this.message.subjectType = this.form.value.subject;
    this.message.senderId = this.authService.getUserInfo().id + '';
    this.message.senderNick = this.authService.getUserInfo().email;
    this.message.imgUrls = [];
    this.message.topic = this.form.value.topic;
    this.message.receiverNick = this.form.value.receiver;
    this.message.msg = this.form.value.msg;
    this.message.local = false;
    const today = new Date();
    this.message.formattedDate = today.getFullYear + '-' + today.getMonth() + '-' + today.getDate();
    this.message.formattedTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  }

  dismiss() {
    console.log('dismissed')
    this.viewCtrl.dismiss(this.message);
  }
  cancleModal() {
    // console.log('canceled')
    // this.viewCtrl.dismiss(undefined);
  }
}
