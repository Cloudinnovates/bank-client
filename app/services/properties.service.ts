import {Injectable}     from 'angular2/core';

@Injectable()
export class PropertiesService{

	url: String;

	constructor(){
		this.url = 'http://localhost:8888/api';
	}
}