import * as mocha from 'mocha';
import * as chai from 'chai';
import {StockRepository} from "../src/stocker.repository";
import * as fs from "fs";
import * as path from "path";
const expect = chai.expect;
let filePath = '../stocker/src/portfolio/';

describe('Test user actions', () => {

    function cleanup() {
        fs.readdir(filePath, (err, files) => {
            if (err) {
                console.log("problem")
            }

            for (const file of files) {
                fs.unlink(path.join(filePath, file), err => {
                    if (err) {
                        console.log("problem")
                    }
                });
            }
        });
    }

    beforeEach(() => {
        cleanup();
    });

    it('should create portfolio for new user', () => {
        new StockRepository('crazylabz');
        expect(fs.existsSync(filePath + 'crazylabz.json')).to.be.true
    });

    it('should save user stocks', () => {
        let repo = new StockRepository('crazylabz1');
        repo.append('GOOGL');
        repo.append('AMAZ');
        let res = repo.list();
        expect(res).to.contain("GOOGL");
        expect(res.split(',').length).to.be.equal(2)
    });

    it('should drop correct stock', () => {
        let repo = new StockRepository('crazylabz2');
        repo.append('GOOGL');
        repo.append('AMAZ');
        repo.append('TWIT');
        repo.drop('AMAZ');
        let res = repo.list();
        expect(res.split(',').length).to.be.equal(2)
    });

});
