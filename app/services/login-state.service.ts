import {Injectable}     from 'angular2/core';


@Injectable()
export class LoginStateService {

	isLogin: String;
	account: String;
	constructor() { 
		this.isLogin = 'false'; 
	}
}