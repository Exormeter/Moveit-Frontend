import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestService } from '../../services/restService';
import { Login } from '../login/login';
import { Http } from '@angular/http';
import { Page } from 'ionic/ionic';
import { User } from "../../models/user";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { DomSanitizer } from '@angular/platform-browser';
import { MyEvent } from '../../models/event';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: './profile.html',
})
export class Profile {

  profileVars = {
    newEmail: '',
    newEmailCheck: '',
    newPassword: '',
    newPasswordCheck: '',
    amountEventSubs: 'X',
    amountEventsCreated: 'Y'
  };

  eventCreated: MyEvent = new MyEvent();
  nextMove: MyEvent = new MyEvent();

  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(public _DomSanitizer: DomSanitizer, public camera: Camera, public navCtrl: NavController, public navParams: NavParams, public restService: RestService, private alertCtrl: AlertController, public user: User) {
  }

  getAmountCreatedMoves() {
    this.restService.getMyEvents()
      .subscribe(response => {
        console.log("respone (getLastCreatedMove): " + response);
        this.profileVars.amountEventsCreated = response.length;
      }, error => {
        console.log("Oooops! @11");
      });
  }

  getAmoundMoveSubs() {
    this.restService.getMyEventSubscriber()
      .subscribe(response => {
        console.log("response (getNextMove): " + response);
        this.profileVars.amountEventSubs = response.length;
      }, error => {
        console.log("Oooops! @22");
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');

    this.getAmountCreatedMoves();
    this.getAmoundMoveSubs();

    if (this.user.$gender == 'male') this.user.$gender = 'männlich';
    else this.user.$gender = 'weiblich';
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
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.user.$picture = base64Image;
      this.restService.setUserPicture(base64Image).subscribe(response => {
        console.log(response.message);
      });
    }, (error) => {
      console.debug("Unable to obtain picture: " + error, "app");
    });
    console.log(this.user.$picture);
  }

  changeEmail() {
    if (this.profileVars.newEmail == "" || this.profileVars.newEmailCheck == "") {
      this.presentAlert("Fehlgeschlagen", "Nicht alle Felder ausgefüllt");
    } else if (this.profileVars.newEmail != this.profileVars.newEmailCheck) {
      this.presentAlert("Fehlgeschlagen", "Emails stimmen nicht überein");
    } else {

      this.user.$email = this.profileVars.newEmail;

      this.restService.changeEmail(this.user)
        .subscribe(response => {
          if (response.message === 'Emails not match') {
            this.presentAlert('Fehlgeschlagen', 'Emails stimmen nicht überein');
          } else if (response.message === 'Email changed succesful') {
            this.presentAlert('Erfolgreich', 'Email erfolgreich geändert');
          } else {
            this.presentAlert('Oh noes D:', 'Etwas unerwartetes ist passiert... Keine Internetverbindung?')
          }
        }, error => {
          console.log("Oooops!");
        });
    }
  }

  changePassword() {
    if (this.profileVars.newPassword == "" || this.profileVars.newPasswordCheck == "") {
      this.presentAlert("Fehlgeschlagen", "Nicht alle Felder ausgefüllt");
    } else if (this.profileVars.newPassword != this.profileVars.newPasswordCheck) {
      this.presentAlert("Fehlgeschlagen", "Passwörter stimmen nicht überein");
    } else {

      this.user.$password = this.profileVars.newPassword;

      this.restService.changePassword(this.user)
        .subscribe(response => {
          if (response.message === 'Passwords not match') {
            this.presentAlert('Fehlgeschlagen', 'Passwörter stimmen nicht überein');
          } else if (response.message === 'Password changed succesful') {
            this.presentAlert('Erfolgreich', 'Password erfolgreich geändert');
          } else {
            this.presentAlert('Oh noes D:', 'Etwas unerwartetes ist passiert... Keine Internetverbindung?')
          }
        }, error => {
          console.log("Oooops!");
        });
    }
  }

  deleteAccount() {
    let alert = this.alertCtrl.create({
      title: 'ACHTUNG!!!!',
      message: 'Sie sind dabei Ihren Account zu löschen! Nach dieser Nachricht kommt eine letzte Bestätigung, nach der gibt es kein zurück mehr!',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {
            console.log('Cancel1 clicked');
          }
        },
        {
          text: 'Fortfahren',
          handler: () => {
            console.log('Okay clicked');

            let alert = this.alertCtrl.create({
              title: 'ACHTUNG!!!!',
              message: 'Letzte Chance!!!',
              buttons: [
                {
                  text: 'Abbrechen',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel2 clicked');
                  }
                },
                {
                  text: 'Account löschen',
                  handler: () => {
                    console.log('Account löschen clicked');

                    this.restService.deleteUser()
                      .subscribe(response => {
                        if (response.message === 'User deleted') {
                          this.navCtrl.setRoot(Login);
                        } else {
                          this.presentAlert('Oh noes D:', 'Etwas unerwartetes ist passiert... Keine Internetverbindung?')
                        }
                      }, error => {
                        console.log("Oooops!");
                      });
                  }
                }
              ]
            });
            alert.present();
          }
        }
      ]
    });
    alert.present();
  }
}