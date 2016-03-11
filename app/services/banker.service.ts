import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {AccountDetail}           from '../models/account-detail';
import {NewAccount} from '../models/new-account';
import {LoginInfo} from '../models/login-info';
import {Observable}     from 'rxjs/Observable';

import {LoginStateService} from '../services/login-state.service';
import {PropertiesService} from './properties.service';

@Injectable()
export class BankerService {


	constructor(private http: Http,
		private _loginStateService: LoginStateService,
		private _propertiesService: PropertiesService) {
		// TODO: Use official Angular2 CORS support when merged (https://github.com/angular/angular/issues/4231).
		let _build = (<any>http)._backend._browserXHR.build;
		(<any>http)._backend._browserXHR.build = () => {
			let _xhr = _build();
			_xhr.withCredentials = true;
			return _xhr;
		};

		this._accountLoginUrl = _propertiesService.url + '/bankersession';
		this._createAccountUrl = _propertiesService.url + '/accounts';
	}

	private _accountLoginUrl: string;
	private _createAccountUrl: string;

	login(username: String, password: String) {
		var url = this._accountLoginUrl;
		let body = JSON.stringify({ username, password });
		let headers = new Headers({ 'Content-type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(url, body, options)
			.map(res => <LoginInfo>res.json())
			.do(data => {
				console.log(data);
				if (data.success === true)
					this._loginStateService.isLogin = 'banker';
			})
			.catch(this.handleError);
	}

	logout() {
		var url = this._accountLoginUrl;
		return this.http.delete(url)
			.map(res => <LoginInfo>res.json())
			.do(data => {
				console.log(data);
				if (data.success === true)
					this._loginStateService.isLogin = 'false';
			})
			.catch(this.handleError);
	}

	createAccount(userName: String, userFirstName: String, balance: number){

		let body = JSON.stringify({ userName, userFirstName, balance });
		let headers = new Headers({ 'Content-type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http.post(this._createAccountUrl, body, options)
			.map(res => <NewAccount>res.json())
			.do(data => {
				console.log(data);
			})
			.catch(this.handleError);
	}

	// TODO Change to handleError service
	private handleError(error: Response) {
		// in a real world app, we may send the error to some remote logging infrastructure
		// instead of just logging it to the console
		console.error(error);
		return Observable.throw(error.text() || 'Server error');
	}

}
