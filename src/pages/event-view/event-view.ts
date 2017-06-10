import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  templateUrl: 'event-view.html',
  providers: [MyEvent]
})


export class EventView {

    event: MyEvent;

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

    }

    ionViewDidLoad(){
        
    }



}