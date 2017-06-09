import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, ViewController } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker, CameraPosition, GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

IonicPage()
@Component({
  selector: 'page-map-view',
  templateUrl: 'map-view.html'
})
export class MapView {
 
    map: GoogleMap;
    geolocation: Geolocation = new Geolocation();
    googleMaps: GoogleMaps = new GoogleMaps();
    
    
    constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams, public viewCtrl: ViewController, ) {
        console.log("Constructed");
    }
    
    ionViewWillEnter(){
      console.log("ionViewDidLoad MapView");
      this.loadMap();
    }

    loadMap(){
        let location = new LatLng(-34.9290,138.6010);
 
        let element: HTMLElement = document.getElementById('map');

        this.map = this.googleMaps.create(element);
    }
    


}

  

  

