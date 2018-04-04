import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
  @ViewChild('roleForm') roleForm;
  useragency = {
    agency: '',
    agentID: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public restHandlerService: ResthandlerProvider, public toastCtrl: ToastController) {
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
  submitRoleChange(event) {
    console.log('change role: '+ this.roleForm.value.agency +' '+ this.roleForm.value.agentID)
    this.restHandlerService.changeUserRole(
      '' + this.roleForm.value.agency,
      '' + this.roleForm.value.agentID).subscribe(
      (response) => {
        let toast = this.toastCtrl.create({
          message: 'You are an Agent now',
          duration: 2000
        })
        toast.present();
      }
    )
  }
  submit(event) {
    this.restHandlerService.updateUseragencystatus(
      '' + this.authService.getUserInfo().id,
      '' + this.agencyForm.value.agency,
      '' + this.agencyForm.value.agencyID
    ).subscribe(
      (response) => {
        let toast = this.toastCtrl.create({
          message: 'Agencydata successfully updated',
          duration: 2000
        });
        toast.present();
      }
    );
  }
}
