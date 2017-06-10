import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestService } from "../../services/restService";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: RestService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListView');
    this.restService.getMyEvents()
      .subscribe(response => {
        var stringList = [];
        response.forEach(element => {
          stringList.push(JSON.stringify(element));
        });
        this.items1 = stringList;
      }, error => {
        console.log("Oooops!");
      });

      this.restService.getMyEventSubscriber()
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
