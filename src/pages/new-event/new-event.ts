import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Page } from 'ionic/ionic';
import { EventCreateMap } from '../event-map-create/event-map-create';
import { MapView } from '../map-view/map-view';
import { RestService } from "../../services/restService";
import { Push } from "@ionic/cloud-angular";
import { MyEvent } from '../../models/event';

/**
 * Generated class for the NewEvent page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-event',
  templateUrl: './new-event.html',
})
export class NewEvent {

  data: any;
  posts: any;

  debugVar = {
    start: '',
    title: '',
    longitude: '',
    latitude: '',
    keywords: ''
  };

  event: MyEvent = new MyEvent();
  lat: number;
  lng: number;
  eventCreated: MyEvent = new MyEvent();

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public restService: RestService, public modelCrtl: ModalController, public push: Push) {
    this.data = {};
    this.data.username = 'admin';
    this.data.password = '123456';
    this.data.response = '';
    this.push.rx.notification()
    .subscribe((msg) => {
      alert(msg.title + ': ' + msg.text);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEvent');

    //beim Laden der Page bekommen wir alle Events die der eingelogte User erstellt hat
    this.restService.getMyEvents()
      .subscribe(response => {
        console.log(response);
        console.log(response.length);
        var eventLength = response.length;
        this.eventCreated.$title = response[eventLength-1].title;
        this.eventCreated.$start = response[eventLength-1].starttimepoint;
      }, error => {
        console.log("Oooops!");
      });
  }

  selectStartOnMap() {
    let mapView = this.modelCrtl.create(EventCreateMap);
    mapView.present();
    mapView.onDidDismiss(data=> {
          this.event.$latitude = data.latitude;
          this.event.$longitude = data.longitude;
    });
  }

  createMove() {
    this.restService.newEvent(this.event)
      .subscribe(response => {
        if (response.message === 'Event erstellt') {
          this.presentAlert('Erfolgreich', 'Event erfolgreich erstellt');
        } else {
          this.presentAlert('Oh noes...', 'Unerwarteter Fehler aufgetreten... Keine Internetverbindung?');
        }
      }, error => {
        console.log("Oooops!");
      });
  }

  /*
  resetInputs() {
    this.event.$title = '';
    this.event.$longitude = '';
    this.event.$latitude = '';
    this.event.$keywords = "";
    this.event.$start = '';
  }
  */

  presentAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['Okay']
    });
    alert.present();
  }
}