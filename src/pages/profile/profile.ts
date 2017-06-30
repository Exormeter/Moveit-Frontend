import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestService } from '../../services/restService';
import { Http } from '@angular/http';
import { Page } from 'ionic/ionic';
import { User } from "../../models/user";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {

  posts: any;

  changeableVars = {
    picture: '',
    newEmail: '',
    newEmailCheck: '',
    newPassword: '',
    newPasswordCheck: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: RestService, private alertCtrl: AlertController, public user: User) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }

  presentAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['Okay']
    });
    alert.present();
  }

  changePicture() {

  }

  changeEmail() {
    if (this.changeableVars.newEmail == "" || this.changeableVars.newEmailCheck == "") {
      this.presentAlert("Fehlgeschlagen", "Nicht alle Felder ausgefüllt");
    } else if (this.changeableVars.newEmail != this.changeableVars.newEmailCheck) {
      this.presentAlert("Fehlgeschlagen", "Emails stimmen nicht überein");
    } else {

      this.user.$email = this.changeableVars.newEmail;

      this.restService.changeEmail(this.user)
        .subscribe(response => {
          if (response.message === 'Emails not match') {
            this.presentAlert('Fehlgeschlagen', 'Emails stimmen nicht überein');
          } else if (response.message === 'Email changed succesful') {
            this.presentAlert('Erfolgreich', 'Email erfolgreich geändert');
          } else {
            this.presentAlert('Oh noes D:', 'Etwas unerwartetes ist passiert... Keine Internetverbindung?')
          }
        }, error => {
          console.log("Oooops!");
        });
    }
  }

  changePassword() {
    if (this.changeableVars.newPassword == "" || this.changeableVars.newPasswordCheck == "") {
      this.presentAlert("Fehlgeschlagen", "Nicht alle Felder ausgefüllt");
    } else if (this.changeableVars.newPassword != this.changeableVars.newPasswordCheck) {
      this.presentAlert("Fehlgeschlagen", "Passwörter stimmen nicht überein");
    } else {

      this.user.$password = this.changeableVars.newPassword;

      this.restService.changePassword(this.user)
        .subscribe(response => {
          if (response.message === 'Passwords not match') {
            this.presentAlert('Fehlgeschlagen', 'Passwörter stimmen nicht überein');
          } else if (response.message === 'Password changed succesful') {
            this.presentAlert('Erfolgreich', 'Password erfolgreich geändert');
          } else {
            this.presentAlert('Oh noes D:', 'Etwas unerwartetes ist passiert... Keine Internetverbindung?')
          }
        }, error => {
          console.log("Oooops!");
        });
    }
  }

  deleteAccount() {

  }
}
