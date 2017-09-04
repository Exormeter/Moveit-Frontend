import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { App, IonicPage, ViewController, NavParams, AlertController } from 'ionic-angular';
import { Push } from '@ionic/cloud-angular';
import { Login } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: './logout.html',
})
export class Logout {

  message: any;

  constructor(public viewCtrl: ViewController, public appCtrl: App, public navParams: NavParams, public http: Http, public push: Push, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Logout');
    this.http.get('https://moveit-backend.herokuapp.com/logout', { withCredentials: true })
      .map(response => response.json())
      .subscribe(response => {
        if (response.message === 'Logout successful') {
          this.push.unregister();
          this.appCtrl.getRootNav().setRoot(Login);
        }
      }, error => {
        console.log("Oooops!");
        this.presentAlert('Oh noes...', 'An unexpected error happened. Maybe no internet connection?');
      });

    this.appCtrl.getRootNav().setRoot(Login);
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