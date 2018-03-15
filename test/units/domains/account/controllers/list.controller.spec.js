'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const AccountListController = require('../../../../../src/domains/account/controllers/list.controller');

describe('AccountListController', function () {
  it('should be a function', function () {
    expect(AccountListController).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.account = {
        asData: () => ({ foo: 'bar' })
      };
      this.accountService = {
        list: sinon.stub()
      };
      this.controller = new AccountListController(this.accountService);
      this.event = {
        params: { id: 'foobar' }
      };
    });

    describe('when list() resolves with a result', function () {
      beforeEach(function () {
        this.accountService.list.resolves([this.account]);
        this.promise = this.controller.handle(this.event);
      });

      it('should resolve with the result', function () {
        const expected = {
          _data: [this.account.asData()],
          _meta: undefined
        };
        return expect(this.promise).to.eventually.deep.equal(expected);
      });
    });

    describe('when list() rejects', function () {
      beforeEach(function () {
        this.error = new Error('foobar');
        this.accountService.list.rejects(this.error);
        this.promise = this.controller.handle(this.event);
      });

      it('should reject with same error', function () {
        return expect(this.promise).to.be.rejectedWith(this.error);
      });
    });
  });
});
