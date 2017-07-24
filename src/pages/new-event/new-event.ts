import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Page } from 'ionic/ionic';
import { EventCreateMap } from '../event-map-create/event-map-create';
import { MapView } from '../map-view/map-view';
import { RestService } from "../../services/restService";
import { Push } from "@ionic/cloud-angular";
import { MyEvent } from '../../models/event';
import { Camera, CameraOptions } from "@ionic-native/camera";

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

  /*
  Alex' To-Do Liste:
  *ng-if bei new-event
  IonLoadWillEnter
  */

  lat: number;
  lng: number;
  event: MyEvent = new MyEvent();
  eventCreated: MyEvent = new MyEvent();
  nextMove: MyEvent = new MyEvent();

  constructor(private camera: Camera, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public restService: RestService, public modelCrtl: ModalController, public push: Push) {
  }

  getLastCreatedMove() {
    this.restService.getMyEvents()
      .subscribe(response => {
        console.log("respone (getLastCreatedMove): " + response);
        let eventLength: number = response.length;
        if (eventLength > 0) {
          this.eventCreated.$title = response[eventLength - 1].title;
          this.eventCreated.$starttimepoint = new Date(response[response.length - 1].starttimepoint).toString();
        } else if (eventLength == 0) {
          this.eventCreated.$title = "Noch kein Move erstellt :(";
          this.eventCreated.$starttimepoint = "";
        }
      }, error => {
        console.log("Oooops! @11");
      });
  }

  getNextMove() {
    this.restService.getMyEventSubscriber()
      .subscribe(response => {
        console.log("response (getNextMove): " + response);
        if (response.length > 0) {
          this.nextMove.$title = response[response.length - 1].title;
          this.nextMove.$starttimepoint = new Date(response[response.length - 1].starttimepoint).toString();
        } else if (response.length == 0) {
          this.nextMove.$title = "Kein Move anstehend :)"
          this.nextMove.$starttimepoint = "";
        }
      }, error => {
        console.log("Oooops! @22");
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEvent');

    this.getLastCreatedMove();
    this.getNextMove();
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
    // Der auskommentierte Teil sind die checks ob alle Eingaben gemacht wurden
    // Damit wir angenehmer testen können ist der auskommentiert
    // Beim Browser können wir auch keinen Standort auswählen also wäre es immer false

    /*
    if (this.event.$title == "" || this.event.$starttimepoint == "" || this.event.$keywords == undefined) {
      this.presentAlert("Fehlgeschlagen", "Nicht alle Felder ausgefüllt");
    } else if (!this.event.$latitude || !this.event.$longitude) {
      this.presentAlert("Fehlgeschlagen", "Keinen Standort ausgewählt");
    } else {
*/
    this.restService.newEvent(this.event)
      .subscribe(response => {
        if (response.message === 'Event erstellt') {
          this.presentAlert('Erfolgreich', 'Event erfolgreich erstellt');
          this.getLastCreatedMove();
        } else {
          this.presentAlert('Oh noes...', 'Unerwarteter Fehler aufgetreten... Keine Internetverbindung?');
        }
      }, error => {
        console.log("Oooops!");
      });
    /*  
      }
      */
  }

  takePhotoLocation() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/png;base64,' + imageData;
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