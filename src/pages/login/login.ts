import { Component } from '@angular/core';
import { AlertController, IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ResthandlerProvider } from '../../providers/resthandler/resthandler';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: Loading;
  registerCredentials = { email: '', password: '' };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private authService: AuthServiceProvider,
              private restHandlerService: ResthandlerProvider) {
  }

  public toRegister() {
    this.navCtrl.push('RegisterPage');
  }

  public login() {
    this.showLoading();
    // console.log(this.registerCredentials);
    this.authService.login(this.registerCredentials, (success) => {
      console.log(success);
      if(success === true) {
        console.log(success);
        this.loading.dismiss();
        this.restHandlerService.getUserdata(this.authService.getUserInfo().id).subscribe(
          (response:any) => {
            this.authService.userInfo = response.data;
          }
        );
        this.navCtrl.setRoot(HomePage);
      } else {
        this.showError('Failed to Login.');
      }

    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
