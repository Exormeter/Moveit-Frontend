import {EventView} from '../event-view/event-view';
import { Component } from '@angular/core';
import {ModalController, IonicPage,  NavController,  NavParams} from 'ionic-angular';
import { RestService } from "../../services/restService";
import { MyEvent } from "../../models/event";

/**
 * Generated class for the ListView page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list-view',
  templateUrl: 'list-view.html',
})
export class ListView {

  myEvents: MyEvent[] = new Array();
  myEventsSub: MyEvent[] = new Array();

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: RestService, public modalCtrl: ModalController) {
  }


  itemSelected(event: MyEvent){
    let eventViewer = this.modalCtrl.create(EventView,{event: event})
    eventViewer.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListView');
    this.restService.getMyEvents()
    .subscribe(response => {
      response.forEach(element => { 
        this.myEvents.push(new MyEvent(element._id, element.createdAt, element.creator, element.title, element.longitude,
        element.latitude, element.start, element.__v, element.subscriber, element.keywords));
      }, error => {
        console.log("Oooops!");
      });
    });

      this.restService.getMyEventSubscriber()
      .subscribe(response => {
      response.forEach(element => { 
        this.myEventsSub.push(new MyEvent(element._id, element.createdAt, element.creator, element.title, element.longitude,
        element.latitude, element.start, element.__v, element.subscriber, element.keywords));
      }, error => {
        console.log("Oooops!");
      });
    });
  }

}
