import * as mocha from 'mocha';
import * as chai from "chai";
import app from "../../src/server";
import chaiHttp = require('chai-http');
import {QueryBuilder} from "../../src/util/query.util";
let nock = require('nock');
let config = require('config');

chai.use(chaiHttp);
const expect = chai.expect;

const STOCK_PATH = "/api/stocks";
let STOCK_API = "http://localhost:9000";
let SEARCH_STOCK_API = "http://localhost:8888";

describe('featch stock details', function () {

    beforeEach(() => {
        nock(STOCK_API)
            .get('/v1/public/yql?' + new QueryBuilder(["AMZN", "GOOGL"]).build())
            .reply(200, response);


        // http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=amazon&region=1&lang=en
        nock(SEARCH_STOCK_API)
            .get('/autoc.finance.yahoo.com/autoc?' + new QueryBuilder(["amazon"]).buildSearchQuery())
            .reply(200, searchResultResponse);
    });

    let response = {
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
    };

    it(("fetch stock"), () => {
        return chai.request(app).get(STOCK_PATH)
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.eql([{"symbol" : "AMZN", "bid" : 955.00,  "name": "Amazon.com, Inc."}, {"symbol" : "GOOGL", "bid" : 956.60, "name": "Alphabet Inc."}]);
            });
    });


    let searchResultResponse = {
        "ResultSet": {
            "Query": "AMZN",
            "Result": [{
                "symbol": "AMZN",
                "name": "Amazon.com, Inc.",
                "exch": "NMS",
                "type": "S",
                "exchDisp": "NASDAQ",
                "typeDisp": "Equity"
            },
                {
                    "symbol": "AMZN.SN",
                    "name": "Amazon.com, Inc.",
                    "exch": "SGO",
                    "type": "S",
                    "exchDisp": "Santiago Stock Exchange",
                    "typeDisp": "Equity"
                }
            ]
        }
    };

    it(("search results"), () => {
        return chai.request(app).get(STOCK_PATH + "/find?name=amazon")
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.eql([{"symbol" : "AMZN", "bid" : 0, "name" : "Amazon.com, Inc."}, {"symbol" : "AMZN.SN", "bid" : 0 , "name" : "Amazon.com, Inc."}]);
            });
    });
});