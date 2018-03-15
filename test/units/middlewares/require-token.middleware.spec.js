'use strict';

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);

const RequireTokenMiddleware = require('../../../src/middlewares/require-token.middleware');

describe('RequireTokenMiddleware', function () {
  it('should be a function', function () {
    expect(RequireTokenMiddleware).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.middleware = new RequireTokenMiddleware();
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
