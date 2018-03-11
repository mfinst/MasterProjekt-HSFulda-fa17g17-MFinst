import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactFormularPage } from './contact-formular';

@NgModule({
  declarations: [
    ContactFormularPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactFormularPage),
  ],
})
export class ContactFormularPageModule {}
