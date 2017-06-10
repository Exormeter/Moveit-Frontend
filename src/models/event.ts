export class MyEvent{

    private _id: string;
    private createdAt: string;
    private creator: string;
    private title: string;
    private longitude: number;
    private latitude: number;
    private start: string;
    private __v: number;
    private subscriber: string[];
    private keywords: string[];



	constructor(id: string = '', $createdAt: string = '', $creator: string = '', $title: string = '' , $longitude: number = 0,
	$latitude: number = 0, $start: string = '', _v: number = 0, $subscriber: string[] = [], $keywords: string[] = []) {
		this._id = id;
		this.createdAt = $createdAt;
		this.creator = $creator;
		this.title = $title;
		this.longitude = $longitude;
		this.latitude = $latitude;
		this.start = $start;
		this.__v = _v;
		this.subscriber = $subscriber;
		this.keywords = $keywords;
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


	public get $start(): string {
		return this.start;
	}

	public set $start(value: string) {
		this.start = value;
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

	public get $subscriber(): string[] {
		return this.subscriber;
	}

	public set $subscriber(value: string[]) {
		this.subscriber = value;
	}

	public getit(): string{
		return "test";
	}
	
    
    
    

	
    



}