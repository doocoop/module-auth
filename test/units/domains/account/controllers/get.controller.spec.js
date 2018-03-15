'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const AccountGetController = require('../../../../../src/domains/account/controllers/get.controller');

describe('AccountGetController', function () {
  it('should be a function', function () {
    expect(AccountGetController).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.account = {
        asData: () => ({ foo: 'bar' })
      };
      this.accountService = {
        get: sinon.stub()
      };
      this.controller = new AccountGetController(this.accountService);
      this.event = {
        params: { id: 'foobar' }
      };
    });

    describe('when get() resolves with an account', function () {
      beforeEach(function () {
        this.accountService.get.resolves(this.account);
        this.promise = this.controller.handle(this.event);
      });

      it('should resolve with the account', function () {
        const expected = {
          _data: this.account.asData(),
          _meta: undefined
        };
        return expect(this.promise).to.eventually.deep.equal(expected);
      });
    });

    describe('when get() resolves with undefined', function () {
      beforeEach(function () {
        this.accountService.get.resolves();
        this.promise = this.controller.handle(this.event);
      });

      it('should reject with same error', function () {
        return expect(this.promise).to.be.rejectedWith('not-found');
      });
    });

    describe('when get() rejects', function () {
      beforeEach(function () {
        this.error = new Error('foobar');
        this.accountService.get.rejects(this.error);
        this.promise = this.controller.handle(this.event);
      });

      it('should reject with same error', function () {
        return expect(this.promise).to.be.rejectedWith(this.error);
      });
    });
  });
});
