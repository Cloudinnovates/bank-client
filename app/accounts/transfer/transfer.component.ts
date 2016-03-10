import {Component} from 'angular2/core';
import {AccountService} from '../../services/account.service';
import {Info} from '../../models/info';

@Component({
	templateUrl: '/app/accounts/transfer/transfer.component.html'
})
export class TransferComponent {

	target: String;
	amount: number;
	info: Info;
	erroMessage: String;

	constructor(private _accountService: AccountService){}

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