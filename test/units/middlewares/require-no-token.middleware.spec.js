'use strict';

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);

const RequireNoTokenMiddleware = require('../../../src/middlewares/require-no-token.middleware');

describe('RequireNoTokenMiddleware', function () {
  it('should be a function', function () {
    expect(RequireNoTokenMiddleware).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.middleware = new RequireNoTokenMiddleware();
    });

    describe('when invoked with an access token', function () {
      beforeEach(function () {
        this.event = {
        };
        this.context = {
          rawAccessToken: 'foobar'
        };
        this.logger = {};
      });

      it('should throw an error', function () {
        const fn = () => this.middleware.handle(this.event, this.context, this.logger);
        expect(fn).to.throw('doocoop.auth.token-not-allowed');
      });
    });
  });
});
