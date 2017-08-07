import {Geolocation} from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { MyEvent } from "../models/event";
import { RestService } from "./restService";

@Injectable()
export class EventService{

    myEventsList: Array<MyEvent> = [];
    myEventsSubscribedList: Array<MyEvent> = [];
    allEventsList: Array<MyEvent> = [];

    myEventsObservable: Observable<MyEvent>;
    myEventsObserver: any;

    myEventsSubscribedObservable: Observable<MyEvent>;
    myEventsSubscribedObserver: any;

    allEventsObservable: Observable<MyEvent>
    allEventsOserver: any;

    constructor(private restService: RestService, private geolocation: Geolocation){
        this.myEventsObservable = new Observable(observer => {
            this.myEventsList.forEach(event => observer.next(event));
            this.myEventsObserver = observer;
            this.refreshMyEventsList();
        });

        this.myEventsSubscribedObservable = new Observable(observer =>{
            this.myEventsSubscribedList.forEach(event => observer.next(event));
            this.myEventsSubscribedObserver = observer;
            this.refreshMyEventsSubscribed();
        });

        this.allEventsObservable = new Observable(observer =>{
            this.allEventsList.forEach(event => observer.next(event));
            this.allEventsOserver = observer;
            this.geolocation.getCurrentPosition().then((position)=>{
                this.refreshAllEventsList(position.coords.latitude, position.coords.longitude);
            });

        });

        
    }


    refreshAllEventsList(lat: number, lng: number){
        this.restService.getAllEvents(lat, lng).subscribe(response => {
            response.forEach(element => {
                let isListed: boolean = false;
                for(let i = 0; i < this.allEventsList.length; i++){
                    if(this.allEventsList[i].$id === element._id){
                        isListed = true;
                    }
                }
                if(!isListed){
                    let newEvent: MyEvent= new MyEvent(element._id, element.createdAt, element.creator, element.title, element.longitude,
                        element.latitude, this.dateToString(new Date(element.starttimepoint)), element.__v, element.picture, element.subscriber,
                        element.keywords, Math.round(element.distA / 10.0) / 100.0
                    );
                    this.allEventsList.push(newEvent);
                    this.allEventsOserver.next(newEvent);
                }
               
            }, error => {
                console.log("Oooops!");
            });
            console.log("All Events loaded");
      });

    }


    refreshMyEventsList(){
        this.restService.getMyEvents().subscribe(response => {
            response.forEach(element => {
                let isListed: boolean = false;
                for(let i = 0; i < this.myEventsList.length; i++){
                    if(this.myEventsList[i].$id === element._id){
                        isListed = true;
                    }
                }

                if(!isListed){
                    let newEvent: MyEvent = new MyEvent(element._id, element.createdAt, element.creator, element.title, element.longitude,
                        element.latitude, this.dateToString(new Date(element.starttimepoint)), element.__v, element.picture, element.subscriber, 
                        element.keywords
                    );
                    this.myEventsList.push(newEvent)
                    this.myEventsObserver.next(newEvent);
                }    
            }, error => {
                console.log("Oooops!");
            });
            console.log("My Events loaded");
      });
    }

    refreshMyEventsSubscribed(){
        this.restService.getMyEventSubscribed().subscribe(response => {
            response.forEach(element => {
                let isListed: boolean = false;
                for(let i = 0; i < this.myEventsSubscribedList.length; i++){
                    if(this.myEventsSubscribedList[i].$id === element._id){
                        isListed = true;
                    }
                }
                if(!isListed){
                    let newEvent: MyEvent = new MyEvent(element._id, element.createdAt, element.creator, element.title, element.longitude,
                        element.latitude, this.dateToString(new Date(element.starttimepoint)), element.__v, element.picture, element.subscriber, 
                        element.keywords
                    );
                    this.myEventsSubscribedList.push(newEvent);
                    this.myEventsSubscribedObserver.next(newEvent);
                }
               
            }, error => {
                console.log("Oooops!");
            });
            console.log("My Events Subed loaded");
      });
    }

    getAllEventListObservable(): Observable<MyEvent>{
        return this.allEventsObservable;
    }

    getMyEventListObservable(): Observable<MyEvent>{
        return this.myEventsObservable;
    }

    getMyEventsSubscribedObservable(): Observable<MyEvent>{
        return this.myEventsSubscribedObservable;
    }

    dateToString(date: Date): string {
        let time: string = "";
        let day: string;
        let month: string;
        let hours: string;
        let minutes: string;

        if (date.getDate() <= 9) {
            day = "" + 0 + date.getDate();
        }
        else {
            day = "" + date.getDate();
        }

        if (date.getMinutes() <= 9) {
            minutes = "" + 0 + date.getMinutes();
        }
        else {
            minutes = "" + date.getMinutes();
        }

        if (date.getMonth() <= 9) {
            month = "" + 0 + (date.getMonth() + 1);
        }
        else {
            month = "" + (date.getMonth() + 1);
        }

        if (date.getHours() <= 9) {
            hours = "" + 0 + date.getHours();
        }
        else {
            hours = "" + date.getHours();
        }

        time = time + day + "." + month + "." + date.getFullYear() + " " + hours + ":" + minutes;
        return time;
  }

}
