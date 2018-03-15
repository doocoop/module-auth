'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const TokenRemoveController = require('../../../../../src/domains/token/controllers/remove.controller');

describe('TokenRemoveController', function () {
  it('should be a function', function () {
    expect(TokenRemoveController).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.tokenService = {
        remove: sinon.stub()
      };
      this.controller = new TokenRemoveController(this.tokenService);
      this.event = {
        params: { id: 'foobar' }
      };
    });

    describe('when remove() resolves with a result', function () {
      beforeEach(function () {
        this.tokenService.remove.resolves();
        this.promise = this.controller.handle(this.event);
      });

      it('should resolve with undefined', function () {
        const expected = {
          _data: undefined,
          _meta: undefined
        };
        return expect(this.promise).to.eventually.deep.equal(expected);
      });
    });

    describe('when remove() rejects', function () {
      beforeEach(function () {
        this.error = new Error('foobar');
        this.tokenService.remove.rejects(this.error);
        this.promise = this.controller.handle(this.event);
      });

      it('should reject with same error', function () {
        return expect(this.promise).to.be.rejectedWith(this.error);
      });
    });
  });
});
