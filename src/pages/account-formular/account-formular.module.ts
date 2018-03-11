import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountFormularPage } from './account-formular';

@NgModule({
  declarations: [
    AccountFormularPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountFormularPage),
  ],
})
export class AccountFormularPageModule {}
