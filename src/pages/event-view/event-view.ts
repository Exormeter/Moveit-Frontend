import { Component } from '@angular/core';
import {ViewController, IonicPage,  NavController,  NavParams} from 'ionic-angular';
import { MyEvent } from '../../models/event';
import { ToastController } from 'ionic-angular';
import { PushService } from "../../services/pushService";
import { User } from "../../models/user";
import { RestService } from "../../services/restService";
import {DomSanitizer} from '@angular/platform-browser';
import { Subscriber } from "../../models/subscriber";
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
    subscriberList: Subscriber[] = new Array();
    creatorAvatar = "https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png"
    isNotSubscriberOrCreator: boolean = true;

    constructor(public _DomSanitizer: DomSanitizer, public restService: RestService, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public toastCtrl: ToastController, public pushService: PushService, public user: User) {
      
    }

    ionViewWillEnter(){
        this.isNotSubscriberOrCreator = true;
        this.event = this.navParams.get('event');
        this.restService.getUserPicture(this.event.$creator).subscribe(response =>{
          this.creatorAvatar = response.picture;
        });
        this.restService.getEventPicture(this.event.$id).subscribe(response =>{
          this.event.$picture = response.picture;
          console.log(response.message);
        });
        if(this.event.$creator == this.user.$username){
          this.isNotSubscriberOrCreator = false;
        }
        this.fillSubscriberList();
    }

    enter(){
      this.restService.subscribeToEvent(this.event.$id).subscribe(response=>{
        if(response.message === "Event updated" ){
          this.sendPush();
          let toast = this.toastCtrl.create({
            message: 'Erfolgreich teilgenommen',
            duration: 3000,
            position: 'middle'
          });
          toast.present();
        }
      });
    }

    cancel(){
      this.viewCtrl.dismiss();
    }

    fillSubscriberList()
    {
      this.event.$subscriber.forEach(subscriber => {
          if(subscriber == this.user.$username){
            this.isNotSubscriberOrCreator = false;
          }
          this.restService.getUserPicture(subscriber).subscribe(response =>{
            this.subscriberList.push(new Subscriber(response.picture, subscriber));
          });       
      });
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