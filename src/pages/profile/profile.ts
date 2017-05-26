import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {

  profileVars = {
    picture: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/1024px-Jumpman_logo.svg.png',
    username: 'plainTextPlaceholder',
    firstname: 'plainTextPlaceholder',
    surname: 'plainTextPlaceholder',
    email: 'plainTextPlaceholder',
    age: 'plainTextPlaceholder',
    gender: 'plainTextPlaceholder',
    // emailfirst und emailsecond sind Variablen für die Abfrage der Email Änderung
    emailfirst: '',
    emailsecond: '',
    // passwordfirst und passwordsecond sind Variablen für die Abfrage der Email Änderung
    passwordfirst: '',
    passwordseocond: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }

  changePicture() {

  }

  changeEmail() {

  }

  changePassword() {

  }

  deleteAccount() {

  }
}
