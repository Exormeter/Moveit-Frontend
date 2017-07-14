import { Component } from '@angular/core';
import {ViewController, IonicPage,  NavController,  NavParams} from 'ionic-angular';
import { MyEvent } from '../../models/event';
import { ToastController } from 'ionic-angular';
import { PushService } from "../../services/pushService";
import { User } from "../../models/user";
import { RestService } from "../../services/restService";
import {DomSanitizer} from '@angular/platform-browser';
/**
 * Generated class for the EventView Modal.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-view',
  templateUrl: './event-view.html'
})


export class EventView {

    event: MyEvent = new MyEvent();
    subscriber: String[] = new Array<String>();
    keywords: String[] = new Array<String>();
    creatorAvatar = "https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png"

    constructor(public _DomSanitizer: DomSanitizer, public restService: RestService, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public toastCtrl: ToastController, public pushService: PushService, public user: User) {
      
    }

    ionViewWillEnter(){
        this.event = this.navParams.get('event');
        this.subscriber = this.event.$subscriber;
        this.keywords = this.event.$keywords;
        this.restService.getUserPicture(this.event.$creator).subscribe(response =>{
          this.creatorAvatar = response.picture;
        });
        this.fillSubscriberList();
    }

    enter(){
      let toast = this.toastCtrl.create({
        message: 'Erfolgreich teilgenommen',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
      this.sendPush();
    }

    cancel(){
      this.viewCtrl.dismiss();
    }

    fillSubscriberList()
    {
      
      console.log("hi");  
      
    }

    sendPush(){
      let pushRecipient: string = this.event.$creator;
      console.log(pushRecipient);
      this.restService.getPushToken(pushRecipient)
      .subscribe(response => {
            console.log(response.pushToken);
            this.pushService.sendPush(response.pushToken, this.user.$username).
            subscribe(response =>{
              console.log(response);
            })
      });
    }





}