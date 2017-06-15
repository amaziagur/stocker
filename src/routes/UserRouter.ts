import {Router, Request, Response, NextFunction} from "express";
import {User} from "../public/app/auth.service";
var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'amaziagur@gmail.com',
        pass: 'Polycom14'
    }
});

export class UserRouter {
    router: Router;
    users: Map<string, User> = new Map<string, User>();

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.post('/', this.create);
    }

    public create = (req: Request, res: Response, next: NextFunction) => {
        this.users.set("z", null);
        if(this.users.get(req.body.email)){
            res.status(500).type('json').send({message:"email allready exits"});
        } else {
            console.log(">>>>>",req.body);
            this.users.set(req.body.lastName, req.body);
            let mailOptions = {
                from: '"Stocker Team 👻" <stocker@stocker.com>', // sender address
                to:  req.body.lastName,
                subject: 'Welcome to Stocker!',
                text: 'Start Stock!',
                html: '<b>Start Stock!</b>'
            };

            console.log(mailOptions);
            transporter.sendMail(mailOptions, (error: any, info: any) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });

            res.status(200).type('json').send({});
        }

    };
}

// Create the DefaultRouter, and export its configured Express.Router
const userRouter = new UserRouter();

export default userRouter.router;
