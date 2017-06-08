import * as mocha from 'mocha';
import * as chai from 'chai';
import {QueryBuilder} from "../src/util/query.util";
import {StockAdapter} from "../src/stock.adapter";
const expect = chai.expect;

describe('Test stock response adapter', () => {

    let data = {
        "query": {
            "count": 2,
            "results": {
                "quote": [{
                    "symbol": "AMZN",
                    "Bid": "955.00",
                    "Name": "Amazon.com, Inc."
                },
                    {
                        "symbol": "GOOGL",
                        "Bid": "956.60",
                        "Name": "Alphabet Inc."
                    }
                ]
            }
        }
    }

    it('should build stock response from raw meta data', () => {
        let stocks = new StockAdapter(data).toStocks();
        expect(stocks[0].symbol).to.be.equal('AMZN');
        expect(stocks[0].bid).to.be.equal(955.00);
        expect(stocks[0].name).to.be.equal("Amazon.com, Inc.");
        expect(stocks[1].symbol).to.be.equal('GOOGL');
        expect(stocks[1].bid).to.be.equal(956.60);
        expect(stocks[1].name).to.be.equal("Alphabet Inc.");
    });

});
