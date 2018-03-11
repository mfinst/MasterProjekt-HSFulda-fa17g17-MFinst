import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ResthandlerProvider } from '../../providers/resthandler/resthandler';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the AccountFormularPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-formular',
  templateUrl: 'account-formular.html',
})
export class AccountFormularPage {
  @ViewChild('accountinfoForm') accountinfoForm: NgForm;
  @ViewChild('notespan') notespan: ElementRef;
  userMail = '';
  errortext = ''
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public restHandlerService: ResthandlerProvider) {
  }

  ionViewDidLoad() {
    this.initForm();
  }

  initForm() {
    // console.log('patchValues')
    this.userMail = this.authService.userInfo.mail;
  }

  submit(event) {
    this.errortext = '';
    if(this.accountinfoForm.value.password === this.accountinfoForm.value.passwordRepeat) {
      this.restHandlerService.updateUsercredentials(
        this.authService.getUserInfo().id,
        '' + this.accountinfoForm.value.email,
        '' + this.accountinfoForm.value.password
      ).subscribe(
        (response) => {
          // do something
        }
      );
    } else if(this.accountinfoForm.value.password === '') {
      this.errortext = 'no passwort entered ';
    } else {
      this.errortext += 'passwords not equal ';
    }
  }

}
