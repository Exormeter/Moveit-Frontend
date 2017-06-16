import { Injectable } from '@angular/core';
import {Response, Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { User } from "../models/user";


@Injectable()
export class RestService{

    constructor(public http: Http){

    }


    login(username: string, password: string): Observable<any>{
        let url: string = 'https://moveit-backend.herokuapp.com/login';

        let response: Observable<any> = this.http.post(url, { username, password: password }, { withCredentials: true })
        .map(response => response.json());
        return response;
    }

    register(user: User): Observable<any>{
        var url = 'https://moveit-backend.herokuapp.com/signup';

        let response: Observable<any> =  this.http.post(url, {
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
        let url: string = 'https://moveit-backend.herokuapp.com/user';
        let response: Observable<any> = this.http.get(url, {withCredentials: true} ).map(res => res.json())

        return response;
    }

    getMyEvents(): Observable<any>{
        let url: string = 'https://moveit-backend.herokuapp.com/myEvents';
        let response: Observable<any> = this.http.get(url, { withCredentials: true })
        .map(response => response.json());
        return response;
    }

    getEventsInCircle(lat: number, lng: number, distance: number): Observable<any> {
        let url: string = 'https://moveit-backend.herokuapp.com/allEventsCircle';

        let response: Observable<any> = this.http.get(url+'?lon='+lng+'&lat='+lat+'&dis='+distance, { withCredentials: true })
        .map(response => response.json());
        return response;
    }

    getMyEventSubscriber(): Observable<any>{
        let url: string = 'https://moveit-backend.herokuapp.com/myEventsSubscriber';
        let response: Observable<any> = this.http.get(url , { withCredentials: true })
        .map(response => response.json());

        return response;
    }
    

    

}