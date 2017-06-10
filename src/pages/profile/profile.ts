import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestService } from '../../services/restService'


/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {

  posts: any;

  profileVars = {
    picture: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/1024px-Jumpman_logo.svg.png',
    username: '',
    firstname: '',
    surname: '',
    email: '',
    age: '',
    gender: '',
    newEmail: '',
    newEmailCheck: '',
    newPassword: '',
    newPasswordCheck: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: RestService, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');

    this.restService.getUser()
    .subscribe(data => {
      this.posts = data.data.children;
    });
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

  }

  changePassword() {

  }

  deleteAccount() {

  }
}
