import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WriteModalPage } from './write-modal';

@NgModule({
  declarations: [
    WriteModalPage,
  ],
  imports: [
    IonicPageModule.forChild(WriteModalPage),
  ],
})
export class WriteModalPageModule {}
