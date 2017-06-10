import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker, CameraPosition, GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { MyEvent } from '../../models/event';

IonicPage()
@Component({
  selector: 'page-map-view',
  templateUrl: 'map-view.html'
})
export class MapView {
 
    map: GoogleMap;
    geolocation: Geolocation = new Geolocation();
    googleMaps: GoogleMaps = new GoogleMaps();
    currentPos: LatLng;
    restURL: string = 'https://moveit-backend.herokuapp.com/allEventsCircle';
    eventList: MyEvent[] = new Array();
    perimeter: number = 100;
    
    
    constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams, public viewCtrl: ViewController, public http: Http) {
        console.log("Constructed");
    }
    
    ionViewWillEnter(){
      console.log("ionViewDidLoad MapView");
      this.loadMap();
    }



    loadMap(){
        let element: HTMLElement = document.getElementById('map');
        this.map = this.googleMaps.create(element);

        this.geolocation.getCurrentPosition().then((resp) => {
             let myPosLatLong: LatLng = new LatLng(resp.coords.latitude, resp.coords.longitude);
             let position: CameraPosition = {
                target: myPosLatLong,
                zoom: 18,
                 tilt: 30
             };
             this.map.moveCamera(position);
             this.loadEvents(myPosLatLong);
        });
    }


    



    loadEvents(pos: LatLng){
      let mapView: MapView = this;
      console.log('Events laden ' + this.restURL+'?lon='+pos.lng+'&lat='+pos.lat+'&dis='+this.perimeter);
        this.http.get(this.restURL+'?lon='+pos.lng+'&lat='+pos.lat+'&dis='+this.perimeter, { withCredentials: true })
      .map(response => response.json())
      .subscribe(response => {
        response.forEach(element => { 
          mapView.eventList.push(new MyEvent(element._id, element.createdAt, element.creator, element.title, element.longitude,
          element.latitude, element.start, element.__v, element.subscriber, element.keywords));

          //Nutze Animation Feld zum Speichern der Event ID, da sonst die MarkerOptions keine
          //zusätzlichen costum Felder zulassen
          let eventPosition: LatLng = new LatLng(element.latitude, element.longitude);
          let markerOptions: MarkerOptions = {
                 position: eventPosition,
                 title: element.title,
                 animation: element._id,
                 markerClick: function(marker: Marker){
                    
                 }
          };

          mapView.map.addMarker(markerOptions);
          console.log(markerOptions.animation);
          
        });
      }, error => {
        console.log("Oooops!");
      });
    }
    


}


  

  

