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
        this.headers = new Headers({
            'Authorization': 'Bearer ' + this.apikey,
            'Content-Type': 'application/json'
        });
    }


    sendPush(token: string, userName: string): Observable<any>{
        let url: string = this.baseurl + '/push/notifications';

        var payload =  {
            tokens: [token],
            profile: 'moveit',
            notification: {
                message: userName + ' nimmt an deinem Move teil!'
            }
        }
        let response: Observable<any> = this.http.post(url, this.headers, payload)
        .map(response => response.json());
        return response;
    }

}