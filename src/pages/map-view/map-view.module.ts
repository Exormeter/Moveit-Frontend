import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapView } from './map-view';

@NgModule({
  declarations: [
    MapView,
  ],
  imports: [
    IonicPageModule.forChild(MapView),
  ],
  exports: [
    MapView
  ]
})
export class MapViewModule { }