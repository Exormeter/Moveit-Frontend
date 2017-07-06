
import { EventView } from '../event-view/event-view';
import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
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
  templateUrl: 'list-view.html',
})
export class ListView {
  myEvents: MyEvent[] = new Array();
  myEventsSub: MyEvent[] = new Array();
  myEventsSearch: MyEvent[] = new Array();
  geolocation: Geolocation = new Geolocation();
  myLat: number;
  myLong: number;

  myEventsLength: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: RestService, public modalCtrl: ModalController) {
  }


  itemSelected(event: MyEvent) {
    let eventViewer = this.modalCtrl.create(EventView, { event: event })
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
        this.myEventsLength = this.myEvents.length;
      });

    this.myEventsSearch = this.myEvents;

    if (this.myEvents.length <= 0) {

    }
    this.getDistance(52.030228, 8.532471);
  }

  reset() {
    this.myEventsSearch = this.myEvents;
  }

  getItems(ev: any) {

    // set val to the value of the searchbar
    let val = ev.target.value;
    this.reset();
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.myEventsSearch = this.myEventsSearch.filter((item) => {
        return (item.$title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getDistance(lat: number, lng: number) {
    var geolocation = (function () {
      'use strict';

      var geoposition;
      var options = {
        maximumAge: 1000,
        timeout: 15000,
        enableHighAccuracy: false
      };

      function _onSuccess(callback, position) {
        //console.log('LAT: ' + lat + 'LNG: ' +lng);
        //console.log('LAT: ' + position.coords.latitude + ' - LON: ' +  position.coords.longitude);
        getDistanceFromLatLonInKm(lat, lng, position.coords.latitude, position.coords.longitude);
        geoposition = position
        callback();
      };

      function _onError(callback, error) {
        console.log(error)
        callback();
      };

      function _getLocation(callback) {
        navigator.geolocation.getCurrentPosition(
          _onSuccess.bind(this, callback),
          _onError.bind(this, callback),
          options
        );
      }

      function deg2rad(deg) {
        return deg * (Math.PI / 180)
      }


      function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {

        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2)
          ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        console.log("Distanz:");
        console.log(d);
        return d;
      }

      return {
        location: _getLocation
      }

    }());

    geolocation.location(function () {
      console.log('finished, loading app.');
    });
  }
}