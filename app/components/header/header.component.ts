import {Component, OnInit} from 'angular2/core';

@Component({
    selector: 'art_header',
    templateUrl: '/app/header/header.component.html'
})

export class HeaderComponent implements OnInit {

	isLogin: String;

	ngOnInit() {
		this.isLogin = 'false';
	}

	setLogout(){
		this.isLogin = 'false';
	}

	setLogAsClient(){
		this.isLogin = 'client';
	}

	setLogAsBanker(){
		this.isLogin = 'banker';
	}
}