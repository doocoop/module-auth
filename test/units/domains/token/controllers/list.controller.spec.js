'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const TokenListController = require('../../../../../src/domains/token/controllers/list.controller');

describe('TokenListController', function () {
  it('should be a function', function () {
    expect(TokenListController).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.token = {
        asData: () => ({ foo: 'bar' })
      };
      this.tokenService = {
        list: sinon.stub()
      };
      this.controller = new TokenListController(this.tokenService);
      this.event = {
        params: { id: 'foobar' }
      };
    });

    describe('when list() resolves with a result', function () {
      beforeEach(function () {
        this.tokenService.list.resolves([this.token]);
        this.promise = this.controller.handle(this.event);
      });

      it('should resolve with the result', function () {
        const expected = {
          _data: [this.token.asData()],
          _meta: undefined
        };
        return expect(this.promise).to.eventually.deep.equal(expected);
      });
    });

    describe('when list() rejects', function () {
      beforeEach(function () {
        this.error = new Error('foobar');
        this.tokenService.list.rejects(this.error);
        this.promise = this.controller.handle(this.event);
      });

      it('should reject with same error', function () {
        return expect(this.promise).to.be.rejectedWith(this.error);
      });
    });
  });
});
