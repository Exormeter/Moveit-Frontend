import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListView page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list-view',
  templateUrl: 'list-view.html',
})
export class ListView {

  items1: any;
  items2: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListView');
    this.http.get('https://moveit-backend.herokuapp.com/myEvents', { withCredentials: true })
      .map(response => response.json())
      .subscribe(response => {
        var stringList = [];
        response.forEach(element => {
          stringList.push(JSON.stringify(element));
        });
        this.items1 = stringList;
      }, error => {
        console.log("Oooops!");
      });

    this.http.get('https://moveit-backend.herokuapp.com/myEventsSubscriber', { withCredentials: true })
      .map(response => response.json())
      .subscribe(response => {
        var stringList = [];
        response.forEach(element => {
          stringList.push(JSON.stringify(element));
        });
        this.items2 = stringList;
      }, error => {
        console.log("Oooops!");
      });
  }

}
