import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { User } from "../models/user";
import { MyEvent } from "../models/event";


@Injectable()
export class RestService {

    //baseurl: string = 'http://localhost:8080';
    baseurl: string = 'https://moveit-backend.herokuapp.com';
    constructor(public http: Http, public user: User) {

    }

    login(username: string, password: string): Observable<any> {
        let url: string = this.baseurl + '/login';

        let response: Observable<any> = this.http.post(url, { username, password: password }, { withCredentials: true })
            .map(response => response.json());
        return response;
    }

    newEvent(event: MyEvent): Observable<any> {
        var url = this.baseurl + '/newEvent';

        // Uhrzeit berechnen wann der Move startet
        // Date.now is aktuelle Lokalzeit in Millisekunden
        // event.$starttimepoint gibt der Benutzer an in wie vielen Minuten das Event startet
        // um die Milliksekunden der Minuten zu bekommen, rechnen wir die Minuten * 60000
        // Beide Millisekunden kombiniert, ergeben die Startzeit

        var startZeit = + event.$starttimepoint * 60000 + Date.now();

        //console.log("startZeit: " + new Date(startZeit).toString());

        console.log(event.$picture);
        let response: Observable<any> = this.http.post(url, {
            title: event.$title,
            keywords: event.$keywords,
            longitude: event.$longitude,
            latitude: event.$latitude,
            starttimepoint: startZeit,
            subscriber: event.$subscriber,
            picture: event.$picture
        }, { withCredentials: true })
            .map(response => response.json());

        return response;
    }

    register(user: User): Observable<any> {
        var url = this.baseurl + '/signup';

        let response: Observable<any> = this.http.post(url, {
            firstName: user.$firstname,
            lastName: user.$lastname,
            email: user.$email,
            birthdate: user.$birthday,
            sex: user.$gender,
            username: user.$username,
            password: user.$password,
            picture: user.$picture,
            passwordCheck: user.$passwordCheck
        })
            .map(response => response.json());

        return response;
    }

    getUser(): Observable<any> {
        let url: string = this.baseurl + '/user';
        let response: Observable<any> = this.http.get(url, { withCredentials: true }).map(res => res.json())

        return response;
    }

    getAllEvents(lat: number, lng: number): Observable<any> {
        let url: string = this.baseurl + '/allEvents';
        let response: Observable<any> = this.http.get(url + '?lon=' + lng + '&lat=' + lat, { withCredentials: true })
            .map(response => response.json());

        return response;
    }

    getMyEvents(): Observable<any> {
        let url: string = this.baseurl + '/myEvents';
        let response: Observable<any> = this.http.get(url, { withCredentials: true })
            .map(response => response.json());

        return response;
    }

    getEventsInCircle(lat: number, lng: number, distance: number): Observable<any> {
        let url: string = this.baseurl + '/allEventsCircle';

        let response: Observable<any> = this.http.get(url + '?lon=' + lng + '&lat=' + lat + '&dis=' + distance, { withCredentials: true })
            .map(response => response.json());

        return response;
    }

    getMyEventSubscriber(): Observable<any> {
        let url: string = this.baseurl + '/myEventsSubscriber';
        let response: Observable<any> = this.http.get(url, { withCredentials: true })
            .map(response => response.json());

        return response;
    }

    getAllUsers(): Observable<any> {
        let url: string = this.baseurl + '/allUsers';
        let response: Observable<any> = this.http.get(url, { withCredentials: true }).map(res => res.json())

        return response;
    }

    getPushToken(userName: string): Observable<any> {
        let url: string = this.baseurl + '/getUserToken?username=' + userName;
        let response: Observable<any> = this.http.get(url, { withCredentials: true })
            .map(response => response.json());

        return response;
    }

    setPushToken(pushToken: string): Observable<any> {
        let url: string = this.baseurl + '/setUserToken';
        let response: Observable<any> = this.http.post(url, { token: pushToken }, { withCredentials: true })
            .map(response => response.json());

        return response;
    }

    getUserPicture(userName: string): Observable<any> {
        let url: string = this.baseurl + '/getPicture?username=' + userName;
        let response: Observable<any> = this.http.get(url, { withCredentials: true })
            .map(response => response.json());

        return response;
    }

    setUserPicture(base64Picture: string): Observable<any> {
        let url: string = this.baseurl + '/setPicture';
        let response: Observable<any> = this.http.post(url, { picture: base64Picture }, { withCredentials: true })
            .map(response => response.json());

        return response;
    }

    getEventPicture(eventId: string): Observable<any> {
        let url: string = this.baseurl + '/getEventPicture?eventID=' + eventId;
        let response: Observable<any> = this.http.get(url, { withCredentials: true })
            .map(response => response.json());

        return response;
    }

    changeEmail(user: User): Observable<any> {
        var url = this.baseurl + '/userEmail';

        let response: Observable<any> = this.http.post(url, {
            email1: user.$email,
            email2: user.$email
        }, { withCredentials: true })
            .map(response => response.json());

        return response;
    }

    changePassword(user: User): Observable<any> {
        var url = this.baseurl + '/userPassword';

        let response: Observable<any> = this.http.post(url, {
            password1: user.$password,
            password2: user.$password
        }, { withCredentials: true })
            .map(response => response.json());

        return response;
    }

    subscribeToEvent(eventId: string): Observable<any> {
        let url: string = this.baseurl + '/eventSubscribe?eventID=' + eventId;
        let response: Observable<any> = this.http.get(url, { withCredentials: true })
            .map(response => response.json());

        return response;
    }

    getAddress(lat: number, lng: number) {
        let url: string = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=true';
        let response: Observable<any> = this.http.get(url)
            .map(response => response.json());

        return response;
    }
}