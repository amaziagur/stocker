import {Router, Request, Response, NextFunction} from "express";
import {Stock} from "../public/app/stock";
import {StockFetcherClient} from "../stock.fetcher.client";
import {StockAdapter} from "../stock.adapter";
import {StockRepository} from "../stocker.repository";
import * as fs from "fs";
import * as path from "path";
import {Status} from "../status";

let filePath = '../stocker/src/portfolio/';

export class MgmtRouter {
    router: Router;
    constructor() {
        this.init();
    }

    public init() {
        this.router = Router();
        this.router.get('/all', this.all);
    }

    public all = (req: Request, res: Response, next: NextFunction) => {
            res.status(200).type('json').send(this.status());
        }

    private status() : any {
        let statuses : Status [] = [];
        fs.readdir(filePath, (err, files) => {
            if (err) {
                console.log("problem")
            }

            for (const file of files) {
                statuses.push(new Status(file, fs.readFileSync(path.join(filePath, file), 'utf-8')))
            }
        });

        return statuses;
    }



}

const mgmtRouter = new MgmtRouter();

export default mgmtRouter.router;
