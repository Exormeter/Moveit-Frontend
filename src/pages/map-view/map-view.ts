import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, ViewController, ModalController } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker, CameraPosition, GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';
import { MyEvent } from '../../models/event';
import { RestService } from '../../services/restService';
import { EventView } from "../event-view/event-view";
import { EventService } from "../../services/eventService";

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
              public modalCtrl: ModalController, private eventService: EventService) {
  }


  ionViewDidLoad(){
    this.eventService.getAllEventListObservable().subscribe(event =>{
      this.eventList.push(event);
      if(this.navCtrl.isActive(this.viewCtrl)){
        this.loadEvents();
      }
    })
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
      this.loadEvents();
    });
  }

  loadEvents() {
    let mapView: MapView = this;
    this.eventList.forEach(event =>{
          //Nutze Animation Feld zum Speichern der Event ID, da sonst die MarkerOptions keine
          //zusätzlichen costum Felder zulassen
          let eventPosition: LatLng = new LatLng(event.$latitude, event.$longitude);
          let markerOptions: MarkerOptions = {
            position: eventPosition,
            title: event.$title,
            snippet: event.$id
          };
          mapView.map.addMarker(markerOptions).then(function (marker: Marker) {
            marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
              console.log(marker.getSnippet());
              let eventViewer = mapView.navCtrl.push(EventView, { event: mapView.findEvent(marker.getSnippet(), mapView.eventList), pre: MapView })
            });
          })
        });
  }

  findEvent(id: string, eventList: MyEvent[]): MyEvent {
    for (var event of eventList) {
      if (event.$id == id) {
        console.log("Keys" + event.$keywords);
        return event;
      }
    }
    return null;
  }

  
}