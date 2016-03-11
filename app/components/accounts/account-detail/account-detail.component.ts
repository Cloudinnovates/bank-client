import {Component, OnInit} from 'angular2/core';
import {AccountService} from '../../../services/account.service';
import {AccountDetail} from '../../../models/account-detail';
import {LoginStateService} from '../../../services/login-state.service';
@Component({
    templateUrl: '/app/components/accounts/account-detail/account-detail.component.html'
})
export class AccountDetailComponent implements OnInit{

	accountDetail: AccountDetail;
	errorMessage: String;

	constructor(private _accountService: AccountService, private _loginStateService: LoginStateService) { }

	ngOnInit(){
		this._loginStateService.isAuthOrRedirect('client');
		this.getAccountDetail();
	}

	getAccountDetail(){
		this._accountService.getAccountDetail(this._loginStateService.account)
			.subscribe(
			accountDetail => {
				if (!accountDetail) {
					this.errorMessage = 'An error appended';
				}
				else if (typeof (accountDetail.success) !== 'undefined' && !accountDetail.success) {
					this.errorMessage = accountDetail.message;
				}
				else
					this.accountDetail = accountDetail;
				
			},
			error => this.errorMessage = <any>error);
	}
}