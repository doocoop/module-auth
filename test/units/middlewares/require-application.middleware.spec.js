'use strict';

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);

const RequireApplicationMiddleware = require('../../../src/middlewares/require-application.middleware');

describe('RequireApplicationMiddleware', function () {
  it('should be a function', function () {
    expect(RequireApplicationMiddleware).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.middleware = new RequireApplicationMiddleware();
    });

    describe('when invoked with no application', function () {
      beforeEach(function () {
        this.event = {};
        this.context = {};
        this.logger = {};
      });

      it('should throw an error', function () {
        const fn = () => this.middleware.handle(this.event, this.context, this.logger);
        expect(fn).to.throw('doocoop.auth.application-required');
      });
    });
  });
});
