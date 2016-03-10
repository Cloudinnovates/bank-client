import {Component, OnInit} from 'angular2/core';
import {AccountService} from '../../services/account.service';
import {AccountOverview} from '../../models/account-overview';

@Component({
    templateUrl: '/app/accounts/account-overview/account-overview.component.html'
})
export class AccountOverviewComponent implements OnInit {

	accountOverview: AccountOverview;
	errorMessage: String;

	constructor(private _accountService: AccountService) { }

	ngOnInit() {
		this.getAccountOverview();
	}

	getAccountOverview() {
		this._accountService.getAccountOverview()
			.subscribe(
			accountOverview => {
				this.accountOverview = accountOverview;
				if (!this.accountOverview) {
					this.errorMessage = 'An error appended';
				}
			},
			error => this.errorMessage = <any>error);
	}
}