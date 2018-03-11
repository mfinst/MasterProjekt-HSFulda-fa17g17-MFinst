import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResthandlerProvider } from '../../providers/resthandler/resthandler';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AccountFormularPage } from '../account-formular/account-formular';
import { ContactFormularPage } from '../contact-formular/contact-formular';
import { AgencyFormularPage } from '../agency-formular/agency-formular';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  tempUserData: any;
  accountRoot = AccountFormularPage;
  contactRoot = ContactFormularPage;
  agencyRoot = AgencyFormularPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private restHandlerService: ResthandlerProvider,
    private authService: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.loadCredentials();
  }
  loadCredentials() {
    this.restHandlerService.getUserdata(this.authService.getUserInfo().id).subscribe(
      (response: any) => {
        console.log(response);
        this.authService.userInfo = response.data;
        this.tempUserData = response.data;
        // this.accountinfoForm.value({email: response.data.mail});
        // console.log(response);
        // data: {…}
        // agency: "CSURealEstate"
        // agentID: "49-97769-00001"
        // city: "Petersberg"
        // comment: "No comments available"
        // firstname: "Lukas"
        // lastname: "Eggers"
        // mail: "admin@admin.de"
        // phone: null
        // postalcode: "36100"
        // rating: 0
        // role: 3
        // street: "Dipperzer Str. 1"
        // this.accountinfoForm.value.email = response.data.mail; => // undefined
      }
    )
  }
}
