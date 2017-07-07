import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { App, IonicPage, ViewController, NavParams } from 'ionic-angular';

import { Login } from '../login/login';

/**
 * Generated class for the Logout page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: './logout.html',
})
export class Logout {

  message: any;

  constructor(public viewCtrl: ViewController, public appCtrl: App, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Logout');
    this.http.get('https://moveit-backend.herokuapp.com/logout', { withCredentials: true })
      .map(response => response.json())
      .subscribe(response => {
        //this.message = response;
        if (response.message === 'Logout erfolgreich') {
          this.appCtrl.getRootNav().setRoot(Login);
        }
      }, error => {
        console.log("Oooops!");
      });

    this.appCtrl.getRootNav().setRoot(Login);
  }
}