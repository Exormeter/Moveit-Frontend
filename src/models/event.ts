export class MyEvent {

	private _id: string;
	private createdAt: string;
	private creator: string;
	private title: string;
	private longitude: number;
	private latitude: number;
	private starttimepoint: string;
	private __v: number;
	private picture: string;
	private subscriber: string[];
	private keywords: string[];
	private distA: number;
	private isNotHidden: boolean;

	constructor(id: string = '', $createdAt: string = '', $creator: string = '', $title: string = '', $longitude: number = 0,
		$latitude: number = 0, $starttimepoint: string = '', _v: number = 0, $picture: string = '', $subscriber: string[] = [], $keywords: string[] = [],
		$distA: number = 0) {
		this._id = id;
		this.createdAt = $createdAt;
		this.creator = $creator;
		this.title = $title;
		this.longitude = $longitude;
		this.latitude = $latitude;
		this.starttimepoint = $starttimepoint;
		this.__v = _v;
		this.picture = $picture;
		this.subscriber = $subscriber;
		this.keywords = $keywords;
		this.distA = $distA;
		this.isNotHidden = true;
	}

	public get $title(): string {
		return this.title;
	}

	public set $title(value: string) {
		this.title = value;
	}

	public get $keywords(): string[] {
		return this.keywords;
	}

	public set $keywords(value: string[]) {
		this.keywords = value;
	}

	public get $longitude(): number {
		return this.longitude;
	}

	public set $longitude(value: number) {
		this.longitude = value;
	}

	public get $latitude(): number {
		return this.latitude;
	}

	public set $latitude(value: number) {
		this.latitude = value;
	}

	public get $starttimepoint(): string {
		return this.starttimepoint;
	}

	public set $starttimepoint(value: string) {
		this.starttimepoint = value;
	}

	public get $creator(): string {
		return this.creator;
	}

	public set $creator(value: string) {
		this.creator = value;
	}


	public get $id(): string {
		return this._id;
	}

	public set $id(value: string) {
		this._id = value;
	}

	public get $createdAt(): string {
		return this.createdAt;
	}

	public set $createdAt(value: string) {
		this.createdAt = value;
	}

	public get _v(): number {
		return this.__v;
	}

	public set _v(value: number) {
		this.__v = value;
	}

	public get $picture(): string {
		return this.picture;
	}

	public set $picture(value: string) {
		this.picture = value;
	}

	public get $subscriber(): string[] {
		return this.subscriber;
	}

	public set $subscriber(value: string[]) {
		this.subscriber = value;
	}

	public get $distA(): number {
		return this.distA;
	}

	public set $distA(value: number) {
		this.distA = value;
	}

	public get $isNotHidden(): boolean{
		return this.isNotHidden;
	}

	public set $isNotHidden(bool: boolean){
		this.isNotHidden = bool;
	}
}