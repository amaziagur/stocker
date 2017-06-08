import {Component, OnInit} from "@angular/core";
import {Stock} from "./stock";
import {PoolingService} from "./pooling.service";
import {StockFetcherService} from "./stock.fetcher.service";

@Component({
    moduleId: module.id,
    selector: 'stocks-comp',
    templateUrl: `stock.list.component.html`
})
export class StocksListComponent implements OnInit{
    stocks : any [];

    constructor(private stockFetcherService: StockFetcherService) {}
    ngOnInit() : void {
        this.stockFetcherService.poolStocks((stocks: any)=> {
            console.log("here is my stocks", stocks);
            this.stocks = stocks;
        });

    }

    getImage(stockName: any) : string {
        // return "https://logo.clearbit.com/" + stockName + ".com?size=80";
        return "https://logo.clearbit.com/amazon.com?size=80";
    }

    unstock(stock: any) : void {
        console.log("goint to remove", stock);
        this.stockFetcherService.unstock(stock.symbol).toPromise().then(() => {
            var index = this.stocks.indexOf(stock, 0);
            if (index > -1) {
                this.stocks.splice(index, 1);
            }

        }).catch(() => {
            console.log("something is not right! UI")
        });
    }

}

