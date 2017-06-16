import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
<<<<<<< HEAD
import { Http, Headers, RequestOptions } from '@angular/http';
import { Page } from 'ionic/ionic';
=======
import { RestService } from '../../services/restService'

>>>>>>> cc39ca8bf1cd677ae15ad75d841e0139b91e2d89

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
    picture: '',
    username: '',
    firstname: '',
    lastname: '',
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

    /*
        var link = 'https://moveit-backend.herokuapp.com/user';
        var link2 = 'https://www.reddit.com/r/gifs/new/.json?limit=10';
    
        this.http.get(link, { withCredentials: true }).map(res => res.json()).subscribe(
          data => {
            console.log("Succes!");
            this.profileVars.username = data.username;
            this.profileVars.firstname = data.firstName;
            this.profileVars.lastname = data.lastName;
            this.profileVars.email = data.email;
            this.profileVars.age = data.birthdate;
    
            if(data.sex == 'male') this.profileVars.gender = 'Männlich';
            else if(data.sex == 'female') this.profileVars.gender = 'Weiblich';
            else this.profileVars.gender = 'N/A';
          },
          err => {
            console.log("Oops!");
          }
        );
    */
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
