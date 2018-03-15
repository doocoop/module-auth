'use strict';

const mongoose = require('mongoose');

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);

const AccountDomain = require('../../../../src/domains/account/account.domain');

describe('AccountDomain', function () {
  it('should be a function', function () {
    expect(AccountDomain).to.be.a('function');
  });

  describe('api', function () {
    beforeEach(function () {
      this.connection = mongoose.createConnection();
      this.db = { connection: () => this.connection };
      this.accountDomain = new AccountDomain(this.db);
    });

    it('should expose the module api', function () {
      expect(this.accountDomain.addModule).to.be.a('function');
    });
  });
});
