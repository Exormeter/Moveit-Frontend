import { Component } from '@angular/core';
import {ViewController, IonicPage,  NavController,  NavParams} from 'ionic-angular';
import { MyEvent } from '../../models/event';

/**
 * Generated class for the EventView Modal.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-view',
  templateUrl: './event-view.html'
})


export class EventView {

    event: MyEvent = new MyEvent();

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

    }

    ionViewWillEnter(){
        this.event = this.navParams.get('event');
    }

    join(){

    }

    cancel(){
      this.viewCtrl.dismiss();
    }





}