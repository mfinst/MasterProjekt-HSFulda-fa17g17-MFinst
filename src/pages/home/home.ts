import { Component } from '@angular/core';
import { ActionSheetController, NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  estates = [];
  username = '';
  email = '';

  constructor(public navCtrl: NavController,
              private authService: AuthServiceProvider,
              public actionSheetCtrl: ActionSheetController) {
    let info = this.authService.getUserInfo();
    this.username = info['username'];
    this.email = info['email'];
  }

  public logout() {
    // handle logout
    console.log('Logout Clicked');
  }

  onInput(event) {}
  onCancel(event) {}

  toSearch() {
    this.navCtrl.push('SearchPage');
  }

  showPageList() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pages',
      buttons: [
        {
          text: 'Dashboard',
          handler: () => {
            this.navCtrl.push('DashboardPage');
          }
        },{
          text: 'Search Estates',
          handler: () => {
            this.navCtrl.push('SearchPage');
          }
        },{
          text: 'Messages',
          handler: () => {
            this.navCtrl.push('MessagesPage');
          }
        },{
          text: 'Manage Estate Offers',
          handler: () => {
            this.navCtrl.push('EstatesPage');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
