import fs = require('fs');
let filePath = '../stocker/src/portfolio/';

export class StockRepository {

    constructor(private username : string){
        if (fs.existsSync(filePath + username + '.json')) {
            console.log('user already exist', username);
        } else {
            fs.closeSync(fs.openSync(filePath + username + '.json', 'w'));
        }
    }

    drop(stockSymbol : string) : void {
        let current = this.list().split(',');
        let index = current.indexOf(stockSymbol);
        if (index > -1) {
            current.splice(index, 1);
            fs.writeFileSync(filePath + this.username + '.json', current);
        }
    }

    append(stockSymbol : string) : void {
        let current = this.list().split(',');
        current.push(stockSymbol);
        current = current.filter(function(i){ return i != ""; });
        fs.writeFileSync(filePath + this.username + '.json', current);
    }

    list() : string {
        return fs.readFileSync(filePath + this.username + '.json', 'utf-8')

    }
}