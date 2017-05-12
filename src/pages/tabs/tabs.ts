import { Component } from '@angular/core';

import { NewEvent } from '../new-event/new-event';
import { ListView } from '../list-view/list-view';
import { MapView } from '../map-view/map-view';
import { Profile } from '../profile/profile';
import { Login } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  newEvent = NewEvent;
  listView = ListView;
  mapView = MapView;
  profile = Profile;
  login = Login;

  constructor() {

  }
}
