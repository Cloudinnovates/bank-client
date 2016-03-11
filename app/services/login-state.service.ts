import {Injectable}     from 'angular2/core';
import {Router} from 'angular2/router';
import {PropertiesService} from './properties.service';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class LoginStateService {

	isLogin: string;
	account: string;
	statusUrl: string;
	constructor(private http: Http,
		private _propertiesService: PropertiesService,
		private router: Router) {
		
		this.isLogin = 'false'; 
		this.statusUrl = _propertiesService.url + '/loginStatus';
	}

	updateLoginStatusFromServer(){
		return this.http.get(this.statusUrl)
			.map(res => {
				this.isLogin = res.json().status;
				console.log(this.isLogin)
			})
			.catch(this.handleError);
	}

	isAuthOrRedirect(role: string){
		if(role !== this.isLogin){
			this.router.navigate(['Home']);
		}
	}

	// TODO Change to handleError service
	private handleError(error: Response) {
		// in a real world app, we may send the error to some remote logging infrastructure
		// instead of just logging it to the console
		console.error(error);
		return Observable.throw(error.text() || 'Server error');
	}

}