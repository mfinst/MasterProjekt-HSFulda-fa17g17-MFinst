import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { ResthandlerProvider } from '../../providers/resthandler/resthandler';
import { MessageModel } from '../../providers/resthandler/msg.model';
import { WriteModalPage } from '../write-modal/write-modal';

/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  agent_id: number;
  agent: any;
  errorDetector = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private restHandler: ResthandlerProvider, public toastCtrl: ToastController) {
    this.restHandler.getUserdata(this.navParams.get('id')).subscribe( (data:any) => {
      if(data.success === 'true') {
        this.agent = data.data;
        console.log(this.agent)
      } else {
        this.agent = {}
        this.errorDetector = true;
      }
    })
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProfilPage');
  }

  writeMessage() {
    const initialMsg = new MessageModel();
    initialMsg.msg = ' ';
    initialMsg.receiverNick = this.agent.mail;
    initialMsg.topic = ' ';
    initialMsg.imgUrls = [' ']
    let writeModal = this.modalCtrl.create(WriteModalPage, {message: initialMsg});
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
//   data: {…}
//   agency: "SFStateHomes"
//   agentID: "49-97769-00002"
//   city: "Fulda"
//   comment: "No comments available"
//   firstname: "Sebastian"
//   lastname: "Drechsler
//   mail: "admin@admin2.de"
//   phone: null
//   postalcode: "36037"
//   rating: 0
//   role: 3​​
//   street: "Petersberger Str. 36"
//   __proto__: Object { … }
// ​
// success: "true"
}
