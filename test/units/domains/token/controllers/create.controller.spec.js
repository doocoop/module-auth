'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const TokenCreateController = require('../../../../../src/domains/token/controllers/create.controller');

describe('TokenCreateController', function () {
  it('should be a function', function () {
    expect(TokenCreateController).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.token = {
        asData: () => ({ foo: 'bar' })
      };
      this.tokenService = {
        model: sinon.stub().returns(this.token),
        create: sinon.stub()
      };
      this.controller = new TokenCreateController(this.tokenService);
      this.event = {
        data: { baz: 'qux' }
      };
    });

    describe('when create() resolves', function () {
      beforeEach(function () {
        this.tokenService.create.resolves(this.token);
        this.promise = this.controller.handle(this.event);
      });

      it('should create an token', function () {
        const expected = {
          _data: this.token.asData(),
          _meta: undefined
        };
        return expect(this.promise).to.eventually.deep.equal(expected);
      });
    });

    describe('when create() rejects', function () {
      beforeEach(function () {
        this.error = new Error('foobar');
        this.tokenService.create.rejects(this.error);
        this.promise = this.controller.handle(this.event);
      });

      it('should reject with same error', function () {
        return expect(this.promise).to.be.rejectedWith(this.error);
      });
    });
  });
});
