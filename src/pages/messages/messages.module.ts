import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagesPage } from './messages';
import { MessagesListComponent } from './message-list.component';

@NgModule({
  declarations: [
    MessagesPage,
    MessagesListComponent
  ],
  imports: [
    IonicPageModule.forChild(MessagesPage)
  ],
})
export class MessagesPageModule {}
