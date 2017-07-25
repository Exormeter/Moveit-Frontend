import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventCreateMap } from './event-map-create';

@NgModule({
  declarations: [
    EventCreateMap,
  ],
  imports: [
    IonicPageModule.forChild(EventCreateMap),
  ],
  exports: [
    EventCreateMap
  ]
})
export class EventCreateMapModule { }