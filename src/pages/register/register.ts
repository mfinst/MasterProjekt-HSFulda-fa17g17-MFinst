import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  success = false;
  registerCredentials = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordRepeat: '',
    street: '' ,
    city: '',
    postalcode: '',
    country: ''};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private authService: AuthServiceProvider
  ) {
  }

  public register() {
    // call authService
    if(this.registerCredentials.passwordRepeat !== this.registerCredentials.password) {
      this.showPopup('Error', 'Password incorrect repeated.')
    } else {
      this.authService.register(this.registerCredentials, (success)=> {
        if(success === true) {
          this.showPopup('Success', 'You can log-in now.')
        } else {
          this.showPopup('Error', 'Something went wrong, try again later.')
        }
      })
    }
  }

  showPopup(title: string, text: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [{
        text: 'OK',
        handler: data => {
        // Do something with the data
          this.navCtrl.popToRoot();
        }}]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
