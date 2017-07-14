import {Geolocation} from '@ionic-native/geolocation';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { NewEvent } from '../pages/new-event/new-event';
import { ListView } from '../pages/list-view/list-view';
import { MapView } from '../pages/map-view/map-view';
import { Profile } from '../pages/profile/profile';
import { Logout } from '../pages/logout/logout';
import { EventCreateMap } from '../pages/event-map-create/event-map-create'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestService } from "../services/restService";
import { EventView } from "../pages/event-view/event-view";
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { User } from "../models/user";
import { MyEvent } from "../models/event";
import { PushService } from "../services/pushService";
import { Camera } from "@ionic-native/camera";

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'efbb80ad'
  },
  'push': {
    'sender_id': '945206221819',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    Login,
    Register,
    NewEvent,
    ListView,
    MapView,
    Profile,
    Logout,
    EventCreateMap,
    EventView
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    Login,
    Register,
    NewEvent,
    ListView,
    MapView,
    Profile,
    Logout,
    EventCreateMap,
    EventView
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RestService,
    User,
    Geolocation,
    PushService,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
