import { EventView } from '../event-view/event-view';
import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestService } from "../../services/restService";
import { MyEvent } from "../../models/event";
import { User } from "../../models/user";
import { Geolocation } from '@ionic-native/geolocation';
import { LatLng } from '@ionic-native/google-maps';
import { EventService } from "../../services/eventService";

@IonicPage()
@Component({
  selector: 'page-list-view',
  templateUrl: './list-view.html',
})
export class ListView {
  myEvents: MyEvent[] = new Array();
  allEvents: MyEvent[] = new Array();
  geolocation: Geolocation = new Geolocation();
  myLat: number = 52;
  myLong: number = 8;
  count: number;
  keywordsHashtag: string;
  myAddress: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: RestService, public modalCtrl: ModalController,
    private alertCtrl: AlertController, private eventService: EventService) {
      
  }


  itemSelected(event: MyEvent) {
    let eventViewer = this.modalCtrl.create(EventView, { event: event })
    eventViewer.present();
  }

  subcribeToEventLists(){
    this.eventService.getAllEventListObservable().subscribe(event =>{
      this.allEvents.push(event);
    });

    this.eventService.getMyEventListObservable().subscribe(event =>{
      console.log(event);
      this.myEvents.push(event);
    });
  }

  mySplit(keywords: string[]) {
    this.keywordsHashtag = ""
    keywords.forEach(element => {

      this.keywordsHashtag += " #" + element;
    })
    return this.keywordsHashtag;
  }

  ionViewDidLoad(){
    this.subcribeToEventLists();
  }

  ionViewWillEnter() {
    this.updatePosition();
  }

  getSubscriberCount(sub: User[]) {
    this.count = 0;
    sub.forEach(element => {
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
  }


  reset(){
    this.myEvents.forEach((event) => {
      event.$isNotHidden = true;
    });

     this.allEvents.forEach((event) => {
      event.$isNotHidden = true;
    });
  }


  getItems(ev: any) {
    this.reset();
    let input = ev.target.value;
    if (input) {
      input = input.trim();
      input = input.toLowerCase();
      if (input) {
        this.myEvents.forEach((event) => {
          let isFound: boolean = false;
          for (var index = 0; index < event.$keywords.length; index++) {
            let keyword: string = event.$keywords[index].toLowerCase();
            if (keyword.indexOf(input) >= 0) {
              isFound = true;
            }
          }
          if(!isFound){
            event.$isNotHidden = false;
          }
        });

        this.allEvents.forEach((event) => {
          let isFound: boolean = false;
          for (var index = 0; index < event.$keywords.length; index++) {
            let keyword: string = event.$keywords[index].toLowerCase();
            if (keyword.indexOf(input) >= 0) {
              isFound = true;
            }
          }
          if(!isFound){
            event.$isNotHidden = false;
          }
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

}