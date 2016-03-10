import {Transaction} from './transaction';

export interface AccountDetail {
	balance: number;
	transactions: [Transaction];
}