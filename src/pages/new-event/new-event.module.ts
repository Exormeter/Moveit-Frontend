import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewEvent } from './new-event';

@NgModule({
  declarations: [
    NewEvent,
  ],
  imports: [
    IonicPageModule.forChild(NewEvent),
  ],
  exports: [
    NewEvent
  ]
})
export class NewEventModule { }