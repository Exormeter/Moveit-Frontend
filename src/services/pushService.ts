import { Injectable } from '@angular/core';
import {Response, Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { User } from "../models/user";

@Injectable()
export class PushService{

    apikey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMDNhYWU1NC03ODYwLTRiNTgtODA1Ny0wOTU5MTM4Yjg3YjIifQ.JQW--Jokpf7HBxE4FJD1m94mqgVIJQPj1ZUnIe28db8';
    baseurl: string = 'https://api.ionic.io';
    profile: string = 'moveit';
    headers: Headers;

    constructor(private http: Http){
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.apikey);
        this.headers.append('Content-Type', 'application/json');
    }

    sendPush(token: string, userName: string, event: string): Observable<any>{
        let url: string = this.baseurl + '/push/notifications';
        var payload =  {
            tokens: [token],
            profile: 'moveit',
            notification: {
                message: userName + ' nimmt an deinem Move '+ event + ' teil!'
            }
        }
        let response: Observable<any> = this.http.post(url, JSON.stringify(payload), {headers: this.headers})
        .map(response => response.json());
        return response;
    }
}