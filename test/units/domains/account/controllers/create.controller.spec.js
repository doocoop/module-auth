'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const AccountCreateController = require('../../../../../src/domains/account/controllers/create.controller');

describe('AccountCreateController', function () {
  it('should be a function', function () {
    expect(AccountCreateController).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.account = {
        asData: () => ({ foo: 'bar' })
      };
      this.accountService = {
        model: sinon.stub().returns(this.account),
        create: sinon.stub()
      };
      this.controller = new AccountCreateController(this.accountService);
      this.event = {
        data: { baz: 'qux' }
      };
    });

    describe('when create() resolves', function () {
      beforeEach(function () {
        this.accountService.create.resolves(this.account);
        this.promise = this.controller.handle(this.event);
      });

      it('should create an account', function () {
        const expected = {
          _data: this.account.asData(),
          _meta: undefined
        };
        return expect(this.promise).to.eventually.deep.equal(expected);
      });
    });

    describe('when create() rejects', function () {
      beforeEach(function () {
        this.error = new Error('foobar');
        this.accountService.create.rejects(this.error);
        this.promise = this.controller.handle(this.event);
      });

      it('should reject with same error', function () {
        return expect(this.promise).to.be.rejectedWith(this.error);
      });
    });
  });
});
