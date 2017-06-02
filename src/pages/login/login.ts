import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Page } from 'ionic/ionic';
import { AlertController } from 'ionic-angular';

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

  data: any;

  loginVars = {
    username: '',
    password: ''
  };

  posts: any;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.data = {};
    this.data.username = 'admin';
    this.data.password = '123456';
    this.data.response = '';
    this.http = http;
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Login fehlgeschlagen',
      subTitle: 'Ungültiger Username oder Passwort.',
      buttons: ['Okay']
    });
    alert.present();
  }

  login() {
    var link = 'https://moveit-backend.herokuapp.com/login';

    this.http.post(link, { username: this.loginVars.username, password: this.loginVars.password }, { withCredentials: true })
      .map(response => response.json())
      .subscribe(response => {
        if (response.message === 'Login erfolgreich') {
          this.navCtrl.setRoot(TabsPage);
        } else if (response.message === 'Login fehlgeschlagen') {
          this.presentAlert();
        }
      }, error => {
        console.log("Oooops!");
      });
  }

  register() {
    this.navCtrl.push(Register);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }
}