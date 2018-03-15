'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const VerifyTokenMiddleware = require('../../../src/middlewares/verify-token.middleware');

describe('VerifyTokenMiddleware', function () {
  it('should be a function', function () {
    expect(VerifyTokenMiddleware).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.tokenService = {
        verify: sinon.stub()
      };
      this.middleware = new VerifyTokenMiddleware(this.tokenService);
    });

    describe('when verify() resolves', function () {
      beforeEach(function () {
        this.token = 'foobar';
        this.event = {};
        this.context = {
        };
        this.logger = {};
        this.tokenService.verify.resolves(this.token);
        this.promise = this.middleware.handle(this.event, this.context, this.logger);
      });

      it('should resolve', function () {
        return expect(this.promise).to.eventually.equal(undefined);
      });

      it('should set context.accessToken', function () {
        return this.promise.then(() => {
          expect(this.context.accessToken).to.equal(this.token);
        });
      });
    });

    describe('when verify() rejects', function () {
      beforeEach(function () {
        this.error = new Error('foobar');
        this.event = {};
        this.context = {};
        this.logger = {};
        this.tokenService.verify.rejects(this.error);
        this.promise = this.middleware.handle(this.event, this.context, this.logger);
      });

      it('should resolve', function () {
        return expect(this.promise).to.eventually.equal(undefined);
      });

      it('should set context.accessTokenError', function () {
        return this.promise.then(() => {
          expect(this.context.accessTokenError).to.equal(this.error.message);
        });
      });
    });
  });
});
