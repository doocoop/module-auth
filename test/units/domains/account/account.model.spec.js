'use strict';

const mongoose = require('mongoose');

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);

const AccountModel = require('../../../../src/domains/account/account.model');

describe('AccountModel', function () {
  it('should be a function', function () {
    expect(AccountModel).to.be.a('function');
  });

  describe('api', function () {
    beforeEach(function () {
      this.connection = mongoose.createConnection();
      this.db = { connection: () => this.connection };
      this.accountModel = new AccountModel(this.db);
    });

    it('should expose the mongoose api', function () {
      expect(this.accountModel.create).to.be.a('function');
    });
  });
});
