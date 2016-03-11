import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {BankerService} from '../services/banker.service';
import {LoginInfo} from '../models/login-info';

@Component({
    templateUrl: '/app/bankerlogin/bankerlogin.component.html'
})
export class BankerloginComponent {


	username: String;
	password: String;
	loginInfo: LoginInfo;
	errorMessage: String;

	constructor(private router: Router, private _bankerService: BankerService) { }

	login() {
		this._bankerService.login(this.username, this.password)
			.subscribe(
			loginInfo => {
				this.loginInfo = loginInfo;
				if (!this.loginInfo) {
					this.errorMessage = 'No result from server';
				}
				if (this.loginInfo.success) {
					this.router.navigate(['AccountOverview']);
				}
			},
				error => this.errorMessage = <any>error);

	}

}