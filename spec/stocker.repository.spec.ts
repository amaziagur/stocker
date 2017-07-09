import * as mocha from 'mocha';
import * as chai from 'chai';
import {StockRepository} from "../src/stocker.repository";
const expect = chai.expect;

describe('Test user actions', () => {
    it('should save user stocks', () => {
        let repo = new StockRepository('crazylabz@com');
        repo.append('GOOGL');
        expect(repo.list()).to.contain("GOOGL");
    });

});
