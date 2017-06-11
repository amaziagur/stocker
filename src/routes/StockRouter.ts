import {Router, Request, Response, NextFunction} from "express";
import {Stock} from "../public/app/stock";
import {StockFetcherClient} from "../stock.fetcher.client";
import {StockAdapter} from "../stock.adapter";

export class StockRouter {
    router: Router;
    // stocks : string [] = ["AMZN", "GOOGL"];
    stocks : string [] = [];
    constructor() {
        this.init();
    }

    public init() {
        this.router = Router();
        this.router.get('/', this.get);
        this.router.get('/find', this.find);
        this.router.get('/add', this.add);
        this.router.get('/unstock', this.unstock);
    }

    public get = (req: Request, res: Response, next: NextFunction) => {
        console.log("im in get list", this.stocks);
        if(this.stocks.length > 0){
            new StockFetcherClient().getStock(this.stocks)
                .then((stock : string) => {
                    console.log("%%%%%%", stock)
                res.status(200).type('json').send(new StockAdapter(JSON.parse(stock)).toStocks());
            }).catch((error : any) => {
                console.log("problem?", error)
            });
        } else {
            res.status(200).type('json').send([]);
        }

    };

    public find = (req: Request, res: Response, next: NextFunction) => {
        console.log("im in find one");
        new StockFetcherClient().findStock(req.query.name).then((stock : string) => {
            res.status(200).type('json').send(new StockAdapter(JSON.parse(stock)).toSearchResults());
        });
    };

    public add = (req: Request, res: Response, next: NextFunction) => {
        console.log("helloooo", req.query.name);
        this.stocks.push(req.query.name);
        console.log("all my stocks!", this.stocks);
        res.status(200).send({});
    };

    public unstock = (req: Request, res: Response, next: NextFunction) => {
        console.log("going to unstock the following stock", req.query.name);
        console.log("here is my stocks before remove", this.stocks);
        this.stocks = this.stocks.filter(item => item !== req.query.name);
        console.log("my stock size", this.stocks.length);
        console.log("here is my stocks after remove", this.stocks);
        res.status(200).send({});
    };
}

const stockRouter = new StockRouter();

export default stockRouter.router;
