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
  templateUrl: 'new-event.html',
})
export class NewEvent {

  data: any;
  posts: any;

  newEventVars = {
    title: '',
    place: '',
    time: '',
    event: '0'
    // event -> Indikator über den Status für den richtigen Screen
    // event = '0'; kein Event Teilnehmer = sieht Screen einen Move zu erstellen
    // event = '1'; hat einen erstellt und sieht die Informationen dazu und kann löschen
    // event = '2'; nimmt teil und sieht Informationen dazu (ggf. abmelden?)
  };

  event: MyEvent = new MyEvent();

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

  resetInputs() {
    this.newEventVars.title = '';
    this.newEventVars.place = '';
    this.newEventVars.time = '';
  }

  presentAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['Okay']
    });
    alert.present();
  }
}