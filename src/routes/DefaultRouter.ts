import {Router, Request, Response, NextFunction} from "express";

export class DefaultRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get('/', this.get);
    }

    public get = (req: Request, res: Response, next: NextFunction) => {
        res.status(200).send("from Angular");
    };
}

// Create the DefaultRouter, and export its configured Express.Router
const defaultRouter = new DefaultRouter();

export default defaultRouter.router;
