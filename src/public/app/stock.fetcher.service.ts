import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {PoolingService} from "./pooling.service";

@Injectable()
export class StockFetcherService {

    constructor (private http: Http, private poolingService: PoolingService) {}

    private stockApi = "/api/stocks";

    unstock(stockSymble: string) : Observable<string> {
        return this.http.get(this.stockApi + "/unstock/?name=" + stockSymble)
            .map(this.extractData)
            .catch(this.handleError);
    }

    push(stockSymble: string) : Observable<string> {
        return this.http.get(this.stockApi + "/add/?name=" + stockSymble)
            .map(this.extractData)
            .catch(this.handleError);
    }

    fetch(stockSymble: string) : Observable<string> {
        return this.http.get(this.stockApi + "/find/?name=" + stockSymble)
            .map(this.extractData)
            .catch(this.handleError);
    }

    poolStocks(callback: any): void {
        this.poolingService.execute(() => this.http.get(this.stockApi).map((data) => {
            console.log('data:', data);
            return data.json()
        })).subscribe(callback);
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
