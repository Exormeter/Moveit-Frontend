import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
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
    birthdate: '',
    sex: '',
    picture: '',  // noch unbenutzt, Bild wird nicht direkt bei Anmeldung gesetzt
    username: '',
    password: '',
    passwordCheck: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }

  createAccount() {

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
}