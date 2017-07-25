/**
 * Created by eugen on 30.06.17.
 */
import { ComponentFixture, async , TestBed } from '@angular/core/testing';
import { TestUtils }               from '../../test';
import { Register }                   from './register';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController} from 'ionic-angular/index';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlatformMock, StatusBarMock, SplashScreenMock,NavMock } from '../../mocks';
import { NavParams } from 'ionic-angular';
import { RestService } from "../../services/restService";
import { Http, Headers, RequestOptions } from '@angular/http';

let fixture: ComponentFixture<Register> = null;
let instance: any = null;

describe('Pages: Register', () => {
    let de: DebugElement;
    let comp: Register;
    let fixture: ComponentFixture<Register>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Register],
            imports: [
                IonicModule.forRoot(Register)
            ],
            providers: [
                NavController,
                { provide: Platform, useClass: PlatformMock},
                { provide: StatusBar, useClass: StatusBarMock },
                { provide: SplashScreen, useClass: SplashScreenMock },
                { provide: NavParams, useClass: NavMock },
                { provide: RestService},
                { provide: Http}
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Register);
        comp = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(comp instanceof Register).toBe(true);
    });
});