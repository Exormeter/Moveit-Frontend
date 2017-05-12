import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListView } from './list-view';

@NgModule({
  declarations: [
    ListView,
  ],
  imports: [
    IonicPageModule.forChild(ListView),
  ],
  exports: [
    ListView
  ]
})
export class ListViewModule {}
