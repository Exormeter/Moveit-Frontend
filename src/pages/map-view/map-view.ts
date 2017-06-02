import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, LatLng, GoogleMaps } from '@ionic-native/google-maps';

IonicPage()
@Component({
  selector: 'page-map-view',
  templateUrl: 'map-view.html'
})
export class MapView {
 
    map: GoogleMap;

    constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams) {
        console.log("Constructed");
    }
    
    ionViewDidLoad(){
      console.log("ionViewDidLoad MapView");
      this.loadMap();
    }

    loadMap(){
 
        let location = new LatLng(-34.9290,138.6010);
 
        this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });
 
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });
 
    }
}

  

  

