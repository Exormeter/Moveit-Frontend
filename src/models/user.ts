import { Injectable} from '@angular/core';

@Injectable()
export class User{

    private username: string;
    private picture: string;
    private gender: string;
    private birthday: string;
    private firstname: string;
    private lastname: string;
    private email: string;
    private password: string;
    private passwordCheck: string;
    private pushToken: string;


	constructor($username: string = '', $picture: string = '', $gender: string = '', $birthday: string = '', $firstname: string = '', $lastname: string = '', $email: string = '', $password: string = '', $passwordCheck: string = '', $pushToken: string = '') {
		this.username = $username;
		this.picture = $picture;
		this.gender = $gender;
		this.birthday = $birthday;
		this.firstname = $firstname;
		this.lastname = $lastname;
		this.email = $email;
		this.password = $password;
        this.passwordCheck = $passwordCheck;
        this.pushToken = $pushToken;
	}
    

	public get $username(): string {
		return this.username;
	}

	public set $username(value: string) {
		this.username = value;
	}

	public get $picture(): string {
		return this.picture;
	}

	public set $picture(value: string) {
		this.picture = value;
	}

	public get $gender(): string {
		return this.gender;
	}

	public set $gender(value: string) {
		this.gender = value;
	}
    

	public get $birthday(): string {
		return this.birthday;
	}

	public set $birthday(value: string) {
		this.birthday = value;
	}

	public get $firstname(): string {
		return this.firstname;
	}

	public set $firstname(value: string) {
		this.firstname = value;
	}

	public get $lastname(): string {
		return this.lastname;
	}

	public set $lastname(value: string) {
		this.lastname = value;
	}

	public get $email(): string {
		return this.email;
	}

	public set $email(value: string) {
		this.email = value;
	}

	public get $password(): string {
		return this.password;
	}

	public set $password(value: string) {
		this.password = value;
	}


	public get $passwordCheck(): string {
		return this.passwordCheck;
	}

	public set $passwordCheck(value: string) {
		this.passwordCheck = value;
	}


	public get $pushToken(): string {
		return this.pushToken;
	}

	public set $pushToken(value: string) {
		this.pushToken = value;
	}
}