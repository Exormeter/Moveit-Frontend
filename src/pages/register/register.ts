import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Page } from 'ionic/ionic';

import { Login } from '../login/login';
import { RestService } from "../../services/restService";
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: './register.html',
})

export class Register {

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public restService: RestService, public user: User) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
    this.resetInputs();
  }

  createAccount() {
    if (this.user.$firstname == '' ||
      this.user.$lastname == '' ||
      this.user.$email == '' ||
      this.user.$username == '' ||
      this.user.$password == '' ||
      this.user.$passwordCheck == '' ||
      this.user.$gender == '' ||
      this.user.$birthday == '') {
      this.presentAlert('Login fehlgeschlagen', 'Nicht alle Felder ausgefüllt');
    } else if (this.user.$password != this.user.$passwordCheck) {
      this.presentAlert('Login fehlgeschlagen', 'Passwörter stimmen nicht überein');
    } else {
      this.user.$picture = "https://www.sitepoint.com/premium/books/full-stack-javascript-development-with-mean/preview/figures/ch9-default-profile-pic.png";
      this.restService.register(this.user)
        .subscribe(response => {
          if (response.message === 'Missing credentials') {
            this.presentAlert('Fehlgeschlagen', 'Benutzername oder Passwort fehlt');
          } else if (response.message === 'User Already Exists') {
            this.presentAlert('Fehlgeschlagen', 'Benutzername bereits vergeben.');
          } else if (response.message === 'User Registration succesful') {
            this.presentAlert('Erfolgreich', 'Glückwunsch, Sie können sich jetzt anmelden');
            this.navCtrl.pop();
          } else {
            this.presentAlert('Oh noes...', 'Unerwarteter Fehler aufgetreten... Keine Internetverbindung?');
          }
        }, error => {
          console.log("Oooops!");
        });
    }
  }

  resetInputs() {
    this.user.$firstname = '',
      this.user.$lastname = '',
      this.user.$email = '',
      this.user.$birthday = '',
      this.user.$gender = '',
      this.user.$username = '',
      this.user.$password = '',
      this.user.$passwordCheck = ''
  }

  presentAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['Okay']
    });
    alert.present();
  }
}