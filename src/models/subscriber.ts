export class Subscriber{

    picture: string;
    username: string;

	constructor($picture: string, $username: string) {
        this.picture = $picture;
        this.username = $username;
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
}