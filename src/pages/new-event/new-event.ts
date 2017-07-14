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

<<<<<<< HEAD
  //data: any;
  //posts: any;

=======
>>>>>>> 1db47f6ec963acd451d7c55043fbe58781608281
  debugVar = {
    start: '',
    title: '',
    longitude: '',
    latitude: '',
    keywords: '',
    firstTime: '',
    secondTime: ''
  };

  lat: number;
  lng: number;
  event: MyEvent = new MyEvent();
  eventCreated: MyEvent = new MyEvent();
  nextMove: MyEvent = new MyEvent();

<<<<<<< HEAD
  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public restService: RestService, public modelCrtl: ModalController, public push: Push) {
    /*
    this.data = {};
    this.data.username = 'admin';
    this.data.password = '123456';
    this.data.response = '';
    */
    this.push.rx.notification()
      .subscribe((msg) => {
        alert(msg.title + ': ' + msg.text);
      });
=======
  constructor(private camera: Camera, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public restService: RestService, public modelCrtl: ModalController, public push: Push) {

>>>>>>> 1db47f6ec963acd451d7c55043fbe58781608281
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEvent');

    // beim Laden der Page bekommen wir alle Events die der eingelogte User erstellt hat
    this.restService.getMyEvents()
      .subscribe(response => {
<<<<<<< HEAD
        //console.log("response:" + response);
        //console.log("response.length:" + response.length);
        this.eventCreated.$title = response[response.length - 1].title;
        this.eventCreated.$start = response[response.length - 1].starttimepoint;
        console.log("this.eventCreated.$start: " + this.eventCreated.$start);
=======
        console.log(response);
        console.log(response.length);
        let eventLength: number = response.length;
        if(eventLength > 0){
          this.eventCreated.$title = response[eventLength-1].title;
          this.eventCreated.$starttimepoint = response[eventLength-1].starttimepoint;
        }
        
>>>>>>> 1db47f6ec963acd451d7c55043fbe58781608281
      }, error => {
        console.log("Oooops! @11");
      });

    // wir zeigen das nächste Event an: entweder vom User selbst erstellt oder teilgenommen
    // zu erst holen wir uns das aktuellste Event an dem man teilnimmt und vergleichen ob das zuletzt erstellte akuteller ist
    /*
    this.restService.getMyEvents()
      .subscribe(response => {
        //console.log("response:" + response);
        //console.log("response.length: (getMyEvents)" + response.length);
        this.debugVar.secondTime = response[response.length - 1].starttimepoint;
        console.log("this.debugVar.secondTime: " + this.debugVar.secondTime);
        if (this.debugVar.firstTime < this.debugVar.secondTime) {
          console.log("Second greater Firsttime");
          this.nextMove.$title = response[response.length - 1].title;
          this.nextMove.$start = response[response.length - 1].starttimepoint;
        }
      }, error => {
        console.log("Oooops! @33");
      });
    */

    this.restService.getMyEventSubscriber()
      .subscribe(response => {
        console.log("response (firstTime): " + response);
        //console.log("response.length (getMyEventSubscriber):" + response.length);
        this.nextMove.$title = response[response.length - 1].title;
        this.nextMove.$start = response[response.length - 1].starttimepoint;
        this.debugVar.firstTime = response[response.length - 1].starttimepoint;
        console.log("this.debugVar.firstTime: " + this.debugVar.firstTime);
        console.log("this.nextMove.$start: " + this.nextMove.$start);
        console.log("response[response.length - 1].starttimepoint: " + response[response.length - 1].starttimepoint);
      }, error => {
        console.log("Oooops! @22");
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
  takePhotoLocation(){
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