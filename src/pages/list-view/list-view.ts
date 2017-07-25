
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
  myLat: number = 52;
  myLong: number = 8;
  count: number;
  keywordsHashtag: string;
  myAddress: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: RestService, public modalCtrl: ModalController,
    private alertCtrl: AlertController) {
  }


  itemSelected(event: MyEvent) {
    let eventViewer = this.modalCtrl.create(EventView, { event: event })
    eventViewer.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListView');
  }

  mySplit(keywords:string[])
  {
    this.keywordsHashtag=""
    keywords.forEach(element=>{

      this.keywordsHashtag += " #" + element;
    })
    return this.keywordsHashtag;
  }

  ionViewWillEnter() {
    this.updatePosition();
  }

  getSubscriberCount(sub: User[])
  {
    this.count = 0;
    sub.forEach(element =>
    {
      this.count++;
    })
    return this.count;
  }

  updatePosition() {
    this.geolocation.getCurrentPosition().then(res => {
      this.myLat = res.coords.latitude;
      this.myLong = res.coords.longitude;

      this.updateAddress();
    });
  }

  updateAddress() {
    if (!this.myAddress) {
      this.restService.getAddress(this.myLat, this.myLong).
        subscribe(r => {
          if (r.results && r.results.length > 0 && r.results[0].formatted_address) {
            this.myAddress = r.results[0].formatted_address;
          } else {
            this.myAddress = 'keine Adresse';
          }
        });
    }

    this.updateLists();
  }

  updateLists() {
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
            console.log(element.starttimepoint);
        }, error => {
          console.log("Oooops!");
        });
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
      val = val.toLowerCase();
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
     let day: string;
     let month: string;
     let hours: string;
     let minutes: string;
     
     if(date.getDate() <= 9){
      day = "" + 0 + date.getDate();
     }
     else{
       day = "" + date.getDate();
     }

     if(date.getMinutes() <= 9){
      minutes = "" + 0 + date.getMinutes();
     }
     else{
       minutes = "" + date.getMinutes();
     }

     if(date.getMonth() <= 9){
      month = "" + 0 + (date.getMonth() + 1);
     }
     else{
       month = "" + (date.getMonth() + 1);
     }

     if(date.getHours() <= 9){
      hours = "" + 0 + date.getHours();
     }
     else{
      hours = "" + date.getHours();
     }

     time = time + day + "." + month + "." + date.getFullYear() + " " + hours + ":" + minutes;
     return time;
   }
}