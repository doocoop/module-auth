'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const AccountService = require('../../../../src/domains/auth/auth.service');

describe('AccountService', function () {
  it('should be a function', function () {
    expect(AccountService).to.be.a('function');
  });

  describe('findByUsername()', function () {
    beforeEach(function () {
      this.user = {};
      this.userModel = {
        findOne: sinon.stub().resolves(this.user)
      };
      this.accountService = new AccountService(null, this.userModel);
      this.promise = this.accountService.findByUsername();
    });

    it('should resolve with the user', function () {
      return expect(this.promise).to.eventually.equal(this.user);
    });
  });
});
