import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Page } from 'ionic/ionic';
import { EventCreateMap } from '../event-map-create/event-map-create';
import { MapView } from '../map-view/map-view';
import { RestService } from "../../services/restService";
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
  templateUrl: 'new-event.html',
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

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public restService: RestService, public modelCrtl: ModalController) {
    this.data = {};
    this.data.username = 'admin';
    this.data.password = '123456';
    this.data.response = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEvent');

    this.restService.getMyEvents()
      .subscribe(response => {
        //console.log(response);
      }, error => {
        console.log("Oooops!");
      });
  }

  selectStartOnMap() {
    let mapView = this.modelCrtl.create(EventCreateMap);
    mapView.present();
    mapView.onDidDismiss(function (data) {
      console.log(data);

      this.event.$longitude = data.longitude;
      this.event.$latitude = data.latitude;
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