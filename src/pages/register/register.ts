import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Page } from 'ionic/ionic';



import { Login } from '../login/login';
import { RestService } from "../../services/restService";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class Register {

  registerVars = {
    firstname: '',
    lastname: '',
    email: '',
    birthdate: '1990-01-01',
    sex: 'male',
    picture: '',  // noch unbenutzt, Bild wird nicht direkt bei Anmeldung gesetzt
    username: '',
    password: '',
    passwordCheck: ''
  };

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public restService: RestService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }

  createAccount() {

    // Lokale Überprüfung der Eingaben bevor POST 
    if (this.registerVars.firstname == '' ||
      this.registerVars.lastname == '' ||
      this.registerVars.email == '' ||
      this.registerVars.username == '' ||
      this.registerVars.password == '' ||
      this.registerVars.passwordCheck == '' ||
      this.registerVars.sex == '' ||
      this.registerVars.birthdate == '') {
      this.presentAlert('Login fehlgeschlagen', 'Nicht alle Felder ausgefüllt');
    } else if (this.registerVars.password != this.registerVars.passwordCheck) {
      this.presentAlert('Login fehlgeschlagen', 'Passwörter stimmen nicht überein');
    } else {

      // POST ab hier

        this.restService.register(this.registerVars)
        .subscribe(response => {
          if (response.message === 'Missing credentials') {
            this.presentAlert('Fehlgeschlagen', 'Benutzername oder Passwort fehlt');
          } else if (response.message === 'User Already Exists') {
            this.presentAlert('Fehlgeschlagen', 'Benutzername bereits vergeben.');
          } else if (response.message === 'User Registration succesful') {
            this.presentAlert('Erfolgreich', 'Glückwunsch, Sie können sich jetzt anmelden');
          } else {
            this.presentAlert('Oh noes...', 'Unerwarteter Fehler aufgetreten... Keine Internetverbindung?');
          }
        }, error => {
          console.log("Oooops!");
        });
    }
  }

  resetInputs() {
    this.registerVars.firstname = '',
      this.registerVars.lastname = '',
      this.registerVars.email = '',
      this.registerVars.birthdate = '',
      this.registerVars.sex = '',
      this.registerVars.username = '',
      this.registerVars.password = '',
      this.registerVars.passwordCheck = ''
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