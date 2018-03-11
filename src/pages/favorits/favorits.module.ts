import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoritsPage } from './favorits';

@NgModule({
  declarations: [
    FavoritsPage,
  ],
  imports: [
    IonicPageModule.forChild(FavoritsPage),
  ],
})
export class FavoritsPageModule {}
