import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ResthandlerProvider } from '../../providers/resthandler/resthandler';

/**
 * Generated class for the ContactFormularPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-formular',
  templateUrl: 'contact-formular.html',
})
export class ContactFormularPage {
  @ViewChild('contactinfoForm') contactinfoForm;
  userContact = {
    firstname: '',
    lastname: '',
    phone: '',
    street: '',
    city: '',
    postalcode: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public restHandlerService: ResthandlerProvider) {
  }

  ionViewDidLoad() {
    // console.log(this.authService.userInfo)
    this.userContact = {
      firstname: this.authService.userInfo.firstname,
      lastname: this.authService.userInfo.lastname,
      phone: this.authService.userInfo.telephone,
      street: this.authService.userInfo.street,
      city: this.authService.userInfo.city,
      postalcode: this.authService.userInfo.postalcode
    };
  }

  initForm() {}

  submit(event) {
      this.restHandlerService.updateUserContact(
        '' + this.authService.getUserInfo().id,
        '' + this.contactinfoForm.value.firstname,
        '' + this.contactinfoForm.value.lastname,
        '' + this.contactinfoForm.value.phone,
        '' + this.contactinfoForm.value.street,
        '' + this.contactinfoForm.value.city,
        '' + this.contactinfoForm.value.postalcode
      ).subscribe(
        (response) => {
          // do something
        }
      );
    }
}
