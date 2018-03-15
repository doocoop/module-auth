'use strict';

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);

const AccountService = require('../../../../src/domains/account/account.service');

describe('AccountService', function () {
  it('should be a function', function () {
    expect(AccountService).to.be.a('function');
  });

  describe('model()', function () {
    beforeEach(function () {
      this.AccountModel = function AccountModel (data) {
        Object.assign(this, data);
      };
      this.accountService = new AccountService(this.AccountModel);
      this.data = { foo: 'bar' };
      this.instance = this.accountService.model(this.data);
    });

    it('should return an instance', function () {
      expect(this.instance).to.be.instanceOf(this.AccountModel);
      expect(this.instance.foo).to.equal('bar');
    });
  });
});
