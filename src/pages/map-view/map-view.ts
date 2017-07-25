import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, ViewController, ModalController } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker, CameraPosition, GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';
import { MyEvent } from '../../models/event';
import { RestService } from '../../services/restService';
import { EventView } from "../event-view/event-view";

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
  eventList: MyEvent[] = new Array();

  geoOptions: GeolocationOptions = {
    enableHighAccuracy: true,
    timeout: 500000,
    maximumAge: 10,
  };

  constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams, public viewCtrl: ViewController,
    public modalCtrl: ModalController, public restService: RestService) {
    console.log("Constructed");
  }

  ionViewWillEnter() {
    console.log("ionViewDidLoad MapView");
    this.loadMap();
  }

  loadMap() {
    let element: HTMLElement = document.getElementById('map');
    this.map = this.googleMaps.create(element);

    this.geolocation.getCurrentPosition(this.geoOptions).then((resp) => {
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

  loadEvents(pos: LatLng) {
    let mapView: MapView = this;
    this.restService.getEventsInCircle(pos.lat, pos.lng, 10000)
      .subscribe(response => {
        response.forEach(element => {
          this.eventList.push(new MyEvent(element._id, element.createdAt, element.creator, element.title, element.longitude,
            element.latitude, this.dateToString(new Date(element.starttimepoint)), element.__v, element.picture, element.subscriber, element.keywords));
          console.log(element);
          //Nutze Animation Feld zum Speichern der Event ID, da sonst die MarkerOptions keine
          //zusätzlichen costum Felder zulassen
            let eventPosition: LatLng = new LatLng(element.latitude, element.longitude);
            let markerOptions: MarkerOptions = {
              position: eventPosition,
              title: element.title,
              snippet: element._id
            };
            mapView.map.addMarker(markerOptions).then(function (marker: Marker) {
              marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                console.log(marker.getSnippet());
                let eventViewer = mapView.navCtrl.push(EventView, { event: mapView.findEvent(marker.getSnippet(), mapView.eventList), pre: MapView })
              });
            })
        });
      }, error => {
        console.log("Oooops!");
      });
  }

    findEvent(id: string, eventList: MyEvent[]): MyEvent{
      for(var event of eventList){
        if(event.$id == id){
          console.log("Keys" + event.$keywords);
          return event;
        }
      } 
      return null;
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