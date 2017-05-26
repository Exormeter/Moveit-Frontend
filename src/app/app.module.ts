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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    Logout
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    Logout
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
