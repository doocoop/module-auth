'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const VerifyApplicationMiddleware = require('../../../src/middlewares/verify-application.middleware');

describe('VerifyApplicationMiddleware', function () {
  it('should be a function', function () {
    expect(VerifyApplicationMiddleware).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.applicationService = {
        get: sinon.stub()
      };
      this.middleware = new VerifyApplicationMiddleware(this.applicationService);
    });

    describe('when get() resolves', function () {
      beforeEach(function () {
        this.application = {
          origins: []
        };
        this.event = {};
        this.context = {
        };
        this.logger = {};
        this.applicationService.get.resolves(this.application);
        this.promise = this.middleware.handle(this.event, this.context, this.logger);
      });

      it('should resolve', function () {
        return expect(this.promise).to.eventually.equal(undefined);
      });

      it('should set context.application', function () {
        return this.promise.then(() => {
          expect(this.context.application).to.equal(this.application);
        });
      });
    });

    describe('when origin exists and get() resolves with application allowing origin', function () {
      beforeEach(function () {
        this.application = {
          origins: ['foobar']
        };
        this.event = {};
        this.context = {
          origin: 'foobar'
        };
        this.logger = {};
        this.applicationService.get.resolves(this.application);
        this.promise = this.middleware.handle(this.event, this.context, this.logger);
      });

      it('should resolve', function () {
        return expect(this.promise).to.eventually.equal(undefined);
      });
    });

    describe('when get() rejects', function () {
      beforeEach(function () {
        this.error = new Error('foobar');
        this.event = {};
        this.context = {};
        this.logger = {};
        this.applicationService.get.rejects(this.error);
        this.promise = this.middleware.handle(this.event, this.context, this.logger);
      });

      it('should reject', function () {
        return expect(this.promise).to.be.rejectedWith(this.error);
      });
    });
  });
});
