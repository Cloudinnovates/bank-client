import {Component} from 'angular2/core';

import {BankerService} from '../../services/banker.service';
import {NewAccount} from '../../models/new-account';

@Component({
	templateUrl: '/app/banker/create-account/create-account.component.html'
})
export class CreateAccountComponent {

	errorMessage: String;
	userName: String;
	userFirstName: String;
	balance: number;
	newAccount: NewAccount;

	constructor(private _bankerService: BankerService){}

	create(){
		this._bankerService.createAccount(this.userName, this.userFirstName, this.balance).subscribe(
			newAccount => {
				this.newAccount = newAccount;
			},
			errorMessage => this.errorMessage = errorMessage);
	}
}