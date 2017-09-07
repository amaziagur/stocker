import {Injectable} from "@angular/core";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
// let config = require('config');

@Injectable()
export class CompanySearcherService {

    constructor (private http: Http) {}

    private searcherDomain = "https://company.clearbit.com/v1/companies/search?query=name"//config.get('companySearchDomain');

    search(companyName: string) : any {
        console.log("%%%*%*%*&@&#$&#$&@#$")
        return this.http.get(this.searcherDomain + ":" + companyName, this.createJsonOptions()).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private createJsonOptions() {
        let headers = new Headers({'Authorization': 'sk_3435b112ec88d4eb72e23a99d7b25449'});
        return new RequestOptions({headers: headers});
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.text();
        return body || "";
    }

    private handleError (error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
