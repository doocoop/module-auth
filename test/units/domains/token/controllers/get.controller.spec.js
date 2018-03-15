'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const TokenGetController = require('../../../../../src/domains/token/controllers/get.controller');

describe('TokenGetController', function () {
  it('should be a function', function () {
    expect(TokenGetController).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.token = {
        asData: () => ({ foo: 'bar' })
      };
      this.tokenService = {
        get: sinon.stub()
      };
      this.controller = new TokenGetController(this.tokenService);
      this.event = {
        params: { id: 'foobar' }
      };
    });

    describe('when get() resolves with an token', function () {
      beforeEach(function () {
        this.tokenService.get.resolves(this.token);
        this.promise = this.controller.handle(this.event);
      });

      it('should resolve with the token', function () {
        const expected = {
          _data: this.token.asData(),
          _meta: undefined
        };
        return expect(this.promise).to.eventually.deep.equal(expected);
      });
    });

    describe('when get() resolves with undefined', function () {
      beforeEach(function () {
        this.tokenService.get.resolves();
        this.promise = this.controller.handle(this.event);
      });

      it('should reject with same error', function () {
        return expect(this.promise).to.be.rejectedWith('not-found');
      });
    });

    describe('when get() rejects', function () {
      beforeEach(function () {
        this.error = new Error('foobar');
        this.tokenService.get.rejects(this.error);
        this.promise = this.controller.handle(this.event);
      });

      it('should reject with same error', function () {
        return expect(this.promise).to.be.rejectedWith(this.error);
      });
    });
  });
});
