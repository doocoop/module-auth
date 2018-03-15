'use strict';

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);

const RequireVerifiedTokenMiddleware = require('../../../src/middlewares/require-verified-token.middleware');

describe('RequireVerifiedTokenMiddleware', function () {
  it('should be a function', function () {
    expect(RequireVerifiedTokenMiddleware).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.middleware = new RequireVerifiedTokenMiddleware();
    });

    describe('when invoked with no accessToken', function () {
      beforeEach(function () {
        this.event = {};
        this.context = {};
        this.logger = {};
      });

      it('should throw an error', function () {
        const fn = () => this.middleware.handle(this.event, this.context, this.logger);
        expect(fn).to.throw('doocoop.auth.token-required');
      });
    });
  });
});
