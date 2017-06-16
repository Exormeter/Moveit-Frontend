import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Page } from 'ionic/ionic';
import { RestService } from '../../services/restService';

import { TabsPage } from '../tabs/tabs';
import { Register } from '../register/register';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  //data: any;

  loginVars = {
    username: 'admin',
    password: '123456'
  };

  //posts: any;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public restService: RestService) {
    /*
      this.data = {};
    this.data.username = 'admin';
     this.data.password = '123456';
      this.data.response = '';
      this.http = http;
  */
  }

  presentAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['Okay']
    });
    alert.present();
  }

  login() {
    // Lokale Überprüfung der Eingaben bevor POST 
    if (this.loginVars.username == '' || this.loginVars.password == '') {
      this.presentAlert('Login fehlgeschlagen', 'Nicht alle Felder ausgefüllt');
    } else {

      // POST ab hier
        this.restService.login(this.loginVars.username, this.loginVars.password)
        .subscribe(response => {
          if (response.message === 'User Login succesful') {
            this.navCtrl.setRoot(TabsPage);
          } else if (response.message === 'User Not found') {
            this.presentAlert('Login fehlgeschlagen', 'Ungültiger Username oder Passwort');
          } else if (response.message === 'Invalid Password') {
            this.presentAlert('Login fehlgeschlagen', 'Falsches Passwort');
          } else {
            this.presentAlert('Oh noes...', 'Unerwarteter Fehler aufgetreten... Keine Internetverbindung?');
          }
        }, error => {
          console.log("Oooops!");
      });
    }
  }

  register() {
    this.navCtrl.push(Register);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }
}