/**
 * Created by eugen on 30.06.17.
 */

import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { EventView } from './event-view';
import { IonicModule, Platform, NavController } from 'ionic-angular/index';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlatformMock, StatusBarMock, SplashScreenMock, NavMock } from '../../mocks';
import { NavParams, ViewController } from 'ionic-angular';
import { RestService } from "../../services/restService";
import { Http } from '@angular/http';

describe('Pages: EventView', () => {
    let comp: EventView;
    let fixture: ComponentFixture<EventView>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventView],
            imports: [
                IonicModule.forRoot(EventView)
            ],
            providers: [
                NavController,
                { provide: Platform, useClass: PlatformMock },
                { provide: StatusBar, useClass: StatusBarMock },
                { provide: SplashScreen, useClass: SplashScreenMock },
                { provide: NavParams, useClass: NavMock },
                { provide: RestService },
                { provide: Http },
                { provide: ViewController }
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventView);
        comp = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(comp instanceof EventView).toBe(true);
    });

});