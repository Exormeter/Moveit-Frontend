import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEvent');
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