import {Stock} from "./public/app/stock";

export class StockAdapter {

    constructor(private data : any){}

    toStocks() : any {
        console.log("here is data", this.data)
        let stocks : any[] = [];

        if(this.data.query.count <= 1){
            stocks.push(new Stock(this.data.query.results.quote.symbol, +this.data.query.results.quote.Bid, this.data.query.results.quote.Name));
        } else {
            for(var i = 0; i  < this.data.query.count; i++){
                stocks.push(new Stock(this.data.query.results.quote[i].symbol, +this.data.query.results.quote[i].Bid, this.data.query.results.quote[i].Name));
            }
        }

        return stocks
    }

    toSearchResults() : any {
        let stocks : any[] = [];
        for(var i = 0; i  < this.data.ResultSet.Result.length; i++){
            stocks.push(new Stock(this.data.ResultSet.Result[i].symbol, 0, this.data.ResultSet.Result[i].name));
        }
        return stocks
    }

}