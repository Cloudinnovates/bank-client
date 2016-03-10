import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {AccountDetail}           from '../models/account-detail';
import {AccountOverview}           from '../models/account-overview';
import {LoginInfo} from '../models/login-info';
import {Info} from '../models/info';
import {Observable}     from 'rxjs/Observable';

import {LoginStateService} from '../services/login-state.service';

@Injectable()
export class AccountService {


	constructor(private http: Http,private _loginStateService: LoginStateService) {
		// TODO: Use official Angular2 CORS support when merged (https://github.com/angular/angular/issues/4231).
		let _build = (<any>http)._backend._browserXHR.build;
		(<any>http)._backend._browserXHR.build = () => {
			let _xhr = _build();
			_xhr.withCredentials = true;
			return _xhr;
		};

	}
	private _accountUrl = 'http://localhost:8888/api/accounts/';  // URL to web api
	private _accountLoginUrl = 'http://localhost:8888/api/clientsession'; 
	private _accountTransfertUrl = 'http://localhost:8888/api/transfer'; 

	getAccountDetail(accountId: String) {
		let url = this._accountUrl + accountId;
		
		return this.http.get(url)
			.map(res => <AccountDetail>res.json())
			.do(data => console.log(data))
			.catch(this.handleError);
	}

	getAccountOverview() {
		let url = this._accountUrl;

		return this.http.get(url)
			.map(res => <AccountOverview>res.json())
			.do(data => console.log(data))
			.catch(this.handleError);
	}

	login(username: String, password: String) {
		let url = this._accountLoginUrl;
		let body = JSON.stringify({ username, password });
		let headers = new Headers({ 'Content-type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(url, body, options)
			.map(res => <LoginInfo>res.json())
			.do(data => {
				console.log(data);
				if (data.success === true)
					this._loginStateService.isLogin = "client";
				this._loginStateService.account = "username";
			})
			.catch(this.handleError);
	}

	transfer(target: String, amount: number){

		let body = JSON.stringify({ target, amount });
		let headers = new Headers({ 'Content-type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this._accountTransfertUrl, body, options)
			.map(res => <Info>res.json())
			.do(data => {
				console.log(data);
			})
			.catch(this.handleError);
	}

	logout(){
		let url = this._accountLoginUrl;
		return this.http.delete(url)
			.map(res => <LoginInfo>res.json())
			.do(data => {
				console.log(data);
				if (data.success === true)
					this._loginStateService.isLogin = "false";
			})
			.catch(this.handleError);
	}

	// TODO Change to handleError service
	private handleError(error: Response) {
		// in a real world app, we may send the error to some remote logging infrastructure
		// instead of just logging it to the console
		console.log(error);
		return Observable.throw(error._body || 'Server error');
	}

}