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
            .get('/v1/public/yql?' + new QueryBuilder(["NFLX"]).build())
            .reply(200, response);

        nock(SEARCH_STOCK_API)
            .get('/autoc.finance.yahoo.com/autoc?' + new QueryBuilder(["amazon"]).buildSearchQuery())
            .reply(200, searchResultResponse);
    });

    afterEach(() => {
        nock.cleanAll()
    });


    let response = {
        "query": {
            "count": 1,
            "results": {
                "quote": {
                    "symbol": "NFLX",
                    "Bid": "955.00",
                    "Name": "Netflix, Inc.",
                    "Change": "-0.17"
                }
            }
        }
    };

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

    // it(("search results"), () => {
    //     return chai.request(app).get(STOCK_PATH + "/find?name=amazon")
    //         .then(res => {
    //             expect(res.status).to.equal(200);
    //             expect(res).to.be.json;
    //             expect(res.body).to.be.eql([{"symbol" : "AMZN", "bid" : 0, "name" : "Amazon.com, Inc."}, {"symbol" : "AMZN.SN", "bid" : 0 , "name" : "Amazon.com, Inc."}]);
    //         });
    // });


    it(("unstock"), () => {
        return chai.request(app).get(STOCK_PATH + "/add?name=NFLX&username=test_spec").then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                return chai.request(app).get(STOCK_PATH + "?username=test_spec").then((res) => {
                    expect(res.body.length).to.be.eql(1);
                    expect(res.body).to.be.eql([{"symbol":"NFLX","bid":955,"name":"Netflix, Inc.", "Change": "-0.17"}]);
                    return chai.request(app).get(STOCK_PATH + "/unstock?name=NFLX&username=test_spec").then((res) => {
                        expect(res.status).to.equal(200);
                        expect(res).to.be.json;
                        return chai.request(app).get(STOCK_PATH + "?username=test_spec").then((res) => {
                            expect(res.body.length).to.be.eql(0);
                            expect(res.body).to.be.eql([]);
                        }).catch((error) => {
                            throw Error(error)
                        });
                    }).catch((error) => {
                        throw Error(error)
                    });
                }).catch((error) => {
                    throw Error(error)
                });
            }).catch((error) => {
                throw Error(error)
            });
    });
});