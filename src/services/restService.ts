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
    constructor(public http: Http) {

    }

    login(username: string, password: string): Observable<any> {
        let url: string = this.baseurl + '/login';

        let response: Observable<any> = this.http.post(url, { username, password: password }, { withCredentials: true })
            .map(response => response.json());
        return response;
    }

    newEvent(event: MyEvent): Observable<any> {
        var url = this.baseurl + '/newEvent';

        let response: Observable<any> = this.http.post(url, {
            title: event.$title,
            keywords: event.$keywords,
            longitude: event.$longitude,
            latitude: event.$latitude,
            start: event.$start,
            subscriber: event.$subscriber
        }, { withCredentials: true })
            .map(response => response.json());

        return response;
    }

    register(user: User): Observable<any> {
        var url = this.baseurl + '/signup';

        let response: Observable<any> = this.http.post(url, {
            firstname: user.$firstname,
            lastname: user.$lastname,
            email: user.$email,
            birthdate: user.$birthday,
            sex: user.$gender,
            username: user.$username,
            password: user.$password,
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

}