import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Page } from 'ionic/ionic';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.data = {};
    this.data.username = 'admin';
    this.data.password = '123456';
    this.data.response = '';
    this.http = http;
  }

  login() {
    var link = 'https://moveit-backend.herokuapp.com/login';

    /*
    var data = { username: this.loginVars.username, password: this.loginVars.password };

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = JSON.stringify({
      username: this.loginVars.username,
      password: this.loginVars.password
    });
    */

    this.http.post(link, {username: this.loginVars.username, password: this.loginVars.password})
      .map(response => response.json())
      .subscribe(response => {
        if (response.message === 'Login erfolgreich') {
          this.navCtrl.setRoot(TabsPage);
        } else {

        }
      }, error => {
        console.log("Oooops!");
      });



  }

  /*
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
          this.data = {};
          this.data.username = 'admin';
          this.data.password = '123456';
          this.data.response = '';
          this.http = http;
    }
  
    login() {
          var link = 'https://moveit-backend.herokuapp.com/login';
          var data = JSON.stringify({username: this.data.username, password: this.data.password});
          
          this.http.post(link, data)
          .subscribe(data => {
          this.data.response = data["_body"];
          }, error => {
              console.log("Oooops!");
          });
  
      //this.navCtrl.setRoot(TabsPage);
    }
    */

  register() {
    this.navCtrl.push(Register);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}
