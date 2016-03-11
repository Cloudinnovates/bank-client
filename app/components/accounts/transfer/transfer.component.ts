import {Component, OnInit} from 'angular2/core';
import {AccountService} from '../../services/account.service';
import {LoginStateService} from '../../services/login-state.service';
import {Info} from '../../models/info';

@Component({
	templateUrl: '/app/accounts/transfer/transfer.component.html'
})
export class TransferComponent implements OnInit{

	target: String;
	amount: number;
	info: Info;
	erroMessage: String;

	constructor(private _accountService: AccountService,
		private _loginStateService: LoginStateService) { }

	ngOnInit(){
		this._loginStateService.isAuthOrRedirect('client');
	}

	transfer(){
		this._accountService.transfer(this.target, this.amount).subscribe(
		info => {
			if(!info.success){
				this.erroMessage = info.message;
			}
			else {
				this.info = info;
			}
		},
		errorMessage => this.erroMessage = errorMessage);
	}
}