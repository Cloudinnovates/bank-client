import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {AccountService} from '../services/account.service';
import {LoginInfo} from '../models/login-info';
import {State} from '../models/state';
@Component({
    templateUrl: '/app/login/login.component.html'
}) 
export class LoginComponent {

	
	username: String;
	password: String;
	loginInfo: LoginInfo;
	errorMessage: String;

	constructor(private router: Router, private _accountService: AccountService) { }

	login() {
		this._accountService.login(this.username, this.password)
			.subscribe(
			loginInfo => {
				this.loginInfo = loginInfo;
				if (!this.loginInfo) {
					this.errorMessage = 'No result from server';
				}
				if (this.loginInfo.success) {
					this.router.navigate(['AccountDetail']);
				}
			},
			error => {
				this.errorMessage = <any>error;
			});
		
	}

}
