
import { EventView } from '../event-view/event-view';
import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestService } from "../../services/restService";
import { MyEvent } from "../../models/event";
import { User } from "../../models/user";
import { Geolocation } from '@ionic-native/geolocation';
import { LatLng } from '@ionic-native/google-maps';

/**
 * Generated class for the ListView page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list-view',
  templateUrl: './list-view.html',
})
export class ListView {
  myEvents: MyEvent[] = [];
  allEvents: MyEvent[] = [];
  myEventsSearch: MyEvent[] = [];
  allEventsSearch: MyEvent[] = [];
  geolocation: Geolocation = new Geolocation();
  myLat: number = 1.23;
  myLong: number = 4.56;

  myEventsLength: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: RestService, public modalCtrl: ModalController,
    private alertCtrl: AlertController) {
  }


  itemSelected(event: MyEvent) {
    let eventViewer = this.modalCtrl.create(EventView, { event: event })
    eventViewer.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListView');

    this.geolocation.getCurrentPosition().then(res => {
      this.myLat = res.coords.latitude;
      this.myLong = res.coords.longitude;
      this.presentAlert("Deine Position:", this.myLat + " " + this.myLong);
      this.ionViewWillEnter();
    });
  }

  ionViewWillEnter() {
    this.myEvents = [];
    this.allEvents = [];
    this.myEventsSearch = [];
    this.allEventsSearch = [];

    this.restService.getMyEvents()
      .subscribe(response => {
        response.forEach(element => {
          this.myEvents.push(new MyEvent(element._id, element.createdAt, element.creator, element.title, element.longitude,
            element.latitude, this.dateToString(new Date(element.starttimepoint)), element.__v, element.picture, element.subscriber, element.keywords));
        }, error => {
          console.log("Oooops!");
        });
      });

    this.restService.getAllEvents(this.myLat, this.myLong)
      .subscribe(response => {
        response.forEach(element => {
          this.allEvents.push(new MyEvent(element._id, element.createdAt, element.creator, element.title, element.longitude,
            element.latitude, this.dateToString(new Date(element.starttimepoint)), element.__v, element.picture, element.subscriber, element.keywords,
            Math.round(element.distA / 10.0) / 100.0));
        }, error => {
          console.log("Oooops!");
        });
        // this.myEventsLength = this.myEvents.length;
      });

    this.myEventsSearch = this.myEvents;
    this.allEventsSearch = this.allEvents;
  }

  reset() {
    this.myEventsSearch = this.myEvents;
    this.allEventsSearch = this.allEvents;
  }

  getItems(ev: any) {
    this.reset();
    // set val to the value of the searchbar
    let val = ev.target.value;
    if (val) {
      val = val.trim();
      if (val) {
        this.myEventsSearch = this.myEventsSearch.filter((e) => {
          for (var index = 0; index < e.$keywords.length; index++) {
            var k = e.$keywords[index].toLowerCase();
            if (k.indexOf(val) >= 0) {
              return true;
            }
          }
          return false;
        });

        this.allEventsSearch = this.allEventsSearch.filter((e) => {
          for (var index = 0; index < e.$keywords.length; index++) {
            var k = e.$keywords[index].toLowerCase();
            if (k.indexOf(val) >= 0) {
              return true;
            }
          }
          return false;
        });
      }
    }
  }

  presentAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['Okay']
    });
    alert.present();
  }

  dateToString(date: Date): string{
    let time: string = "";
    time = time + date.getHours() + ":" + date.getMinutes();
    return time;
  }
}