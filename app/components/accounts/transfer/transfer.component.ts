import {Component, OnInit} from 'angular2/core';
import {AccountService} from '../../../services/account.service';
import {LoginStateService} from '../../../services/login-state.service';
import {Info} from '../../../models/info';

@Component({
	templateUrl: '/app/components/accounts/transfer/transfer.component.html'
})
export class TransferComponent implements OnInit{

	target: String;
	amount: number;
	info: Info;
	errorMessage: String;

	constructor(private _accountService: AccountService,
		private _loginStateService: LoginStateService) { }

	ngOnInit(){
		this._loginStateService.isAuthOrRedirect('client');
	}

	transfer(){

		if(isNaN(this.amount)){
			this.errorMessage = 'Amount must be a number';
		}
		else {
			this.errorMessage = '';

			this._accountService.transfer(this.target, this.amount).subscribe(
				info => {
					if(!info.success){
						this.errorMessage = info.message;
					}
					else {
						this.info = info;
					}
				},
				errorMessage => this.errorMessage = errorMessage);
		}
	}
}