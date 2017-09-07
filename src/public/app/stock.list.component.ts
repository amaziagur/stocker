import {Component, OnInit} from "@angular/core";
import {Stock} from "./stock";
import {PoolingService} from "./pooling.service";
import {StockFetcherService} from "./stock.fetcher.service";
import {CompanySearcherService} from "./company.searcher.service";

@Component({
    moduleId: module.id,
    selector: 'stocks-comp',
    templateUrl: `stock.list.component.html`
})
export class StocksListComponent implements OnInit{
    stocks : any [];

    constructor(private stockFetcherService: StockFetcherService, private companySearcherService : CompanySearcherService) {}
    ngOnInit() : void {
        this.stockFetcherService.poolStocks((stocks: any)=> {
            console.log("here is my stocks", stocks);
            this.stocks = stocks;
        }, JSON.parse(localStorage.getItem("user")).username);

    }

    getImage(name: any) : string {
        // return "https://logo.clearbit.com/" + stockName + ".com?size=80";
        this.companySearcherService.search(name).then((data : any) => {
            console.log(JSON.stringify(data))
        })

        return "https://logo.clearbit.com/amazon.com?size=80";
    }

    trend(Change : number){
        console.log("changeeee", +Change);
        if (Change > 0){
            return "trending_up"
        }

        else if (Change < 0 ){
            return "trending_down"
        }

        else if (Change == 0){
            return "trending_flat"
        }
    }

    unstock(stock: any) : void {
        console.log("goint to remove", stock);
        this.stockFetcherService.unstock(stock.symbol, JSON.parse(localStorage.getItem("user")).username).toPromise().then(() => {
            var index = this.stocks.indexOf(stock, 0);
            if (index > -1) {
                this.stocks.splice(index, 1);
            }

        }).catch(() => {
            console.log("something is not right! UI")
        });
    }

}

