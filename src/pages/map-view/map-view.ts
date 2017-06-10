import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, ViewController, ModalController } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker, CameraPosition, GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { MyEvent } from '../../models/event';
import { RestService} from '../../services/restService';

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
    perimeter: number = 100;
    
    
    constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams, public viewCtrl: ViewController, 
                public modalCtrl: ModalController, public restService: RestService) {
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
      this.restService.getEventsInCircle(pos.lng, pos.lat, 100)
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
                    this.modalCtrl.create();
                 }
          };

          mapView.map.addMarker(markerOptions);
        });
      }, error => {
        console.log("Oooops!");
      });
    }
    


}


  

  

