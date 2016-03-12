import {Component} from 'angular2/core';

import {BankerService} from '../../../services/banker.service';
import {NewAccount} from '../../../models/new-account';
import {LoginStateService} from '../../../services/login-state.service';

@Component({
	templateUrl: '/app/components/banker/create-account/create-account.component.html'
})
export class CreateAccountComponent {

	errorMessage: String;
	userName: String;
	userFirstName: String;
	balance: number;
	newAccount: NewAccount;

	constructor(private _bankerService: BankerService,
		private _loginStateService: LoginStateService){}

	ngOnInit() {
		this._loginStateService.isAuthOrRedirect('banker');
	}

	create(){

		this.errorMessage = '';

		if( isNaN(this.balance)){
			this.errorMessage = 'The balance field must be a number';
		}
		else {
			this._bankerService.createAccount(this.userName, this.userFirstName, this.balance).subscribe(
				newAccount => {
					if (!newAccount) {
						this.errorMessage = 'An error appended';
					}
					else if (typeof (newAccount.success) !== 'undefined' && !newAccount.success) {
						this.errorMessage = newAccount.message;
					}
					else
						this.newAccount = newAccount;
			},
			errorMessage => this.errorMessage = errorMessage);
		}
	}
}