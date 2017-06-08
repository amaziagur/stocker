import * as mocha from 'mocha';
import * as chai from 'chai';
import {QueryBuilder} from "../src/util/query.util";
const expect = chai.expect;

describe('Test query builder', () => {
    it('should build query for', () => {
        let query = new QueryBuilder(["AMZN", "GOOGL"]).build();
        expect(query).to.contain("AMZN");
        expect(query).to.contain("GOOGL");
    });
});
