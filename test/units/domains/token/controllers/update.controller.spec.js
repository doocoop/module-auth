'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const TokenUpdateController = require('../../../../../src/domains/token/controllers/update.controller');

describe('TokenUpdateController', function () {
  it('should be a function', function () {
    expect(TokenUpdateController).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.token = {
        asData: () => ({ foo: 'bar' })
      };
      this.tokenService = {
        update: sinon.stub()
      };
      this.controller = new TokenUpdateController(this.tokenService);
      this.event = {
        params: { id: 'foobar' }
      };
    });

    describe('when update() resolves with a result', function () {
      beforeEach(function () {
        this.tokenService.update.resolves(this.token);
        this.promise = this.controller.handle(this.event);
      });

      it('should resolve with the result', function () {
        const expected = {
          _data: this.token.asData(),
          _meta: undefined
        };
        return expect(this.promise).to.eventually.deep.equal(expected);
      });
    });

    describe('when update() rejects', function () {
      beforeEach(function () {
        this.error = new Error('foobar');
        this.tokenService.update.rejects(this.error);
        this.promise = this.controller.handle(this.event);
      });

      it('should reject with same error', function () {
        return expect(this.promise).to.be.rejectedWith(this.error);
      });
    });
  });
});
