import * as mocha from 'mocha';
import * as chai from "chai";
import app from "../../src/server";
import chaiHttp = require('chai-http');
let nock = require('nock');
chai.use(chaiHttp);
const expect = chai.expect;

const USERS_PATH = "/api/users";

describe('handle users', function () {

    const user = {
        fullName: "tester",
        email: "test@crazylabz.com",
        username: "test",
        password: "1234"
    };

    const failedUser = {
        fullName: "ttt",
        email: "test@crazylabz.com",
        username: "ttt",
        password: "1234"
    };

    beforeEach(() => {
    });

    afterEach(() => {
        nock.cleanAll()
    });

    it(("create new user"), () => {
        return chai.request(app).post(USERS_PATH).set('Authorization', '123').send(user)
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
            });
    });

    it(("should reject given exiting email address"), () => {
        return chai.request(app).post(USERS_PATH).set('Authorization', '123').send(failedUser).catch((error :any) => {
                    expect(error.response.status).to.be.equal(500);
                    expect(JSON.parse(error.response.text).message).to.be.equal("email allready exits");
                });
    });
});