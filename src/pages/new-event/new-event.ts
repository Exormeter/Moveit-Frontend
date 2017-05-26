import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Page } from 'ionic/ionic';
import 'rxjs/add/operator/map';

/**
 * Generated class for the NewEvent page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEvent {

  data: any;
  posts: any;

  newEventVars = {
    title: '',
    place: '',
    time: '',
    event: '0'
    // event -> Indikator über den Status für den richtigen Screen
    // event = '0'; kein Event Teilnehmer = sieht Screen einen Move zu erstellen
    // event = '1'; hat einen erstellt und sieht die Informationen dazu und kann löschen
    // event = '2'; nimmt teil und sieht Informationen dazu (ggf. abmelden?)
  };

  /*
    constructor(public navCtrl: NavController, public http: Http) {
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad NewEvent');
  
      this.http.get('https://moveit-backend.herokuapp.com/login').map(res => res.json()).subscribe(data => {
        this.posts = data.data.children;
      });
    }
  */

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.data = {};
    this.data.username = 'admin';
    this.data.password = '123456';
    this.data.response = '';
    this.http = http;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEvent');

    var link = 'https://moveit-backend.herokuapp.com/myEvents';
    //var data = { username: this.loginVars.username, password: this.loginVars.password };

    this.http.get(link, { withCredentials: true })
      .subscribe(data => {
        this.data.response = data["_body"];
      }, error => {
        console.log("Oooops!");
      });
  }


  selectStartOnMap() {

  }

  createMove() {

  }

  resetInputs() {
    this.newEventVars.title = '';
    this.newEventVars.place = '';
    this.newEventVars.time = '';
  }
}