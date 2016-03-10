import {Component} from 'angular2/core';
import {NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import 'rxjs/Rx';

import {HomeComponent} from './home/home.component';
import {AccountService} from './services/account.service';
import {BankerService} from './services/banker.service';
import {LoginStateService} from './services/login-state.service';

import {LoginComponent} from './login/login.component';
import {BankerloginComponent} from './bankerlogin/bankerlogin.component';
import {AccountDetailComponent} from './accounts/account-detail/account-detail.component';
import {TransferComponent} from './accounts/transfer/transfer.component';
import {AccountOverviewComponent} from './accounts/account-overview/account-overview.component';
import {CreateAccountComponent} from './banker/create-account/create-account.component';
import {State} from './models/state';
import {LoginInfo} from './models/login-info';

@Component({
    selector: 'my-app',
    templateUrl: '/app/app.component.html',
    directives: [NgSwitch, NgSwitchWhen, NgSwitchDefault, ROUTER_DIRECTIVES],
    providers: [AccountService, BankerService, LoginStateService]
})

@RouteConfig([
		{ path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
		{ path: '/login', name: 'Login', component: LoginComponent },
		{ path: '/bankerlogin', name: 'Bankerlogin', component: BankerloginComponent },
		{ path: '/accountdetail', name: 'AccountDetail', component: AccountDetailComponent },
		{ path: '/accountoverview', name: 'AccountOverview', component: AccountOverviewComponent },
		{ path: '/transfert', name: 'Transfert', component: TransferComponent },
		{ path: '/createaccount', name: 'CreateAccount', component: CreateAccountComponent }
])
export class AppComponent{ 
	loginInfo: LoginInfo;
	errorMessage: String;
	constructor(private _router: Router, private _accountService: AccountService, private _loginStateService: LoginStateService) { }	

	logout() {
		this._accountService.logout()
			.subscribe(
			loginInfo => {
				this.loginInfo = loginInfo;
				if (!this.loginInfo || !this.loginInfo.success) {
					this.errorMessage = this.loginInfo.message;
				}
				else {
					this._router.navigate(['Home']);
				}
			},
			error => this.errorMessage = <any>error);
			
	}
}