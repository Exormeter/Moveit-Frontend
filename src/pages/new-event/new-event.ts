import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Page } from 'ionic/ionic';
import { EventCreateMap } from '../event-map-create/event-map-create';
import { MapView } from '../map-view/map-view';
import { RestService } from "../../services/restService";
import { Push } from "@ionic/cloud-angular";
import { MyEvent } from '../../models/event';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { EventService } from "../../services/eventService";
import { Observable } from "rxjs/Rx";

@IonicPage()
@Component({
  selector: 'page-new-event',
  templateUrl: './new-event.html',
})
export class NewEvent {

  lat: number;
  lng: number;
  event: MyEvent = new MyEvent();
  eventCreated: MyEvent = new MyEvent();
  nextMove: MyEvent = new MyEvent();
  newKeyword: string = "";

  constructor(private eventService: EventService, private camera: Camera, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public restService: RestService, public modelCrtl: ModalController, public push: Push) {
  }

  ionViewDidLoad(){
    this.eventService.getMyEventListObservable().subscribe(event => {
        this.eventCreated = event;
    });

    this.eventService.getMyEventsSubscribedObservable().subscribe(event =>{
        this.nextMove = event  
    });
  }


  selectStartOnMap() {
    let mapView = this.modelCrtl.create(EventCreateMap);
    mapView.present();
    mapView.onDidDismiss(data => {
      this.event.$latitude = data.latitude;
      this.event.$longitude = data.longitude;
    });
  }

  createMove() {
    // locationCheck = true: führt beim erstellen des Events ein Check aus, ob ein Standort ausgewählt ist
    // auf false setzen damit man es im Browser testen kann (da man dort kein Standort setzt)
    var locationCheck = true;

    if (this.event.$title == "" || this.event.$starttimepoint == "" || this.event.$keywords == undefined) {
      this.presentAlert("Fehlgeschlagen", "Nicht alle Felder ausgefüllt");
    } else if ((!this.event.$latitude || !this.event.$longitude) && locationCheck) {
      this.presentAlert("Fehlgeschlagen", "Keinen Standort ausgewählt");
    } else {
      this.restService.newEvent(this.event)
        .subscribe(response => {
          if (response.message === 'Event erstellt') {
            this.presentAlert('Erfolgreich', 'Event erfolgreich erstellt');
            this.eventService.refreshMyEventsList();
            this.event = new MyEvent();
          } else {
            this.presentAlert('Oh noes...', 'Unerwarteter Fehler aufgetreten... Keine Internetverbindung?');
          }
        }, error => {
          console.log("Oooops!");
        });
    }
  }

  addToKeywordList() {
    this.event.$keywords.push(this.newKeyword);
    this.newKeyword = "";
  }

  takePhotoLocation() {
    this.eventService.refreshMyEventsList();
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.event.$picture = base64Image;
    }, (err) => {
      console.log(err);
    });
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