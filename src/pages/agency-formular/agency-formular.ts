import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ResthandlerProvider } from '../../providers/resthandler/resthandler';

/**
 * Generated class for the AgencyFormularPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agency-formular',
  templateUrl: 'agency-formular.html',
})
export class AgencyFormularPage {
  @ViewChild('agencyForm') agencyForm;
  useragency = {
    agency: '',
    agentID: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public restHandlerService: ResthandlerProvider) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AgencyFormularPage');
    // agency: "CSURealEstate"
    // agentID: "49-97769-00001"
    this.initForm();
  }

  initForm() {
    this.useragency = {
      agency: this.authService.userInfo.agency,
      agentID: this.authService.userInfo.agentID
    }
  }
  submit(event) {
    this.restHandlerService.updateUseragencystatus(
      '' + this.authService.getUserInfo().id,
      '' + this.agencyForm.value.agency,
      '' + this.agencyForm.value.agencyID
    ).subscribe(
      (response) => {
        // do something
      }
    );
  }
}
