import {QueryBuilder} from "./util/query.util";
let config = require('config');
let http = require("http");

export class StockFetcherClient {

    public findStock(name: string): Promise<string> {
        return new Promise((resolve, reject) => {
            http.get({
                host: config.get('searchStockApiDomain'),
                port: config.get('searchStockApiPort'),
                path: '/autoc.finance.yahoo.com/autoc?' + new QueryBuilder([name]).buildSearchQuery()
            }, function (res: any) {
                var data = '';
                res.setEncoding('utf8');
                res.on('data', function (chunk: any) {
                    data += chunk;
                });
                res.on('end', function () {
                    resolve(data);

                });

            }).on('error', (e: any) => {
                reject("failed to fetch duo: " + e.message);
            });

        });
    }

    public getStock(symbol: string[]) : Promise<string> {
        return new Promise((resolve, reject) => {
            console.log("********", symbol)
            http.get({
                host: config.get('stockApiDomain'),
                port: config.get('stockApiPort'),
                path: '/v1/public/yql?' + new QueryBuilder(symbol).build()
            }, function (res: any) {
                var data = '';
                res.setEncoding('utf8');
                res.on('data', function (chunk: any) {
                    data += chunk;
                });
                res.on('end', function () {
                    resolve(data);

                });

            }).on('error', (e: any) => {
                reject("failed to fetch duo: " + e.message);
            });

        });
    }

}