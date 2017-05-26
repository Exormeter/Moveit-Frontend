import { Component } from '@angular/core';
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
  templateUrl: 'logout.html',
})
export class Logout {

  constructor(public viewCtrl: ViewController, public appCtrl: App, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Logout');
    this.appCtrl.getRootNav().setRoot(Login);
  }
}
