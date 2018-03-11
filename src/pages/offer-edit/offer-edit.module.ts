import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferEditPage } from './offer-edit';

@NgModule({
  declarations: [
    OfferEditPage,
  ],
  imports: [
    IonicPageModule.forChild(OfferEditPage),
  ],
})
export class OfferEditPageModule {}
