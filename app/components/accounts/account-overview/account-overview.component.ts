import {Component, OnInit} from 'angular2/core';
import {AccountService} from '../../services/account.service';
import {AccountOverview} from '../../models/account-overview';
import {LoginStateService} from '../../services/login-state.service';

@Component({
    templateUrl: '/app/accounts/account-overview/account-overview.component.html'
})
export class AccountOverviewComponent implements OnInit {

	accountOverview: AccountOverview;
	errorMessage: String;

	constructor(private _accountService: AccountService,
		private _loginStateService: LoginStateService) { }

	ngOnInit() {
		this._loginStateService.isAuthOrRedirect('banker');
		this.getAccountOverview();
	}

	getAccountOverview() {
		this._accountService.getAccountOverview()
			.subscribe(
			accountOverview => {
				if (!accountOverview) {
					this.errorMessage = 'An error appended';
				}
				else if (typeof (accountOverview.success) !== 'undefined' && !accountOverview.success) {
					this.errorMessage = accountOverview.message;
				}
				else
					this.accountOverview = accountOverview;
			},
			error => this.errorMessage = <any>error);
	}
}