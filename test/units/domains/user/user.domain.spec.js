'use strict';

const mongoose = require('mongoose');

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);

const UserDomain = require('../../../../src/domains/user/user.domain');

describe('UserDomain', function () {
  it('should be a function', function () {
    expect(UserDomain).to.be.a('function');
  });

  describe('api', function () {
    beforeEach(function () {
      this.connection = mongoose.createConnection();
      this.db = { connection: () => this.connection };
      this.userDomain = new UserDomain(this.db);
    });

    it('should expose the module api', function () {
      expect(this.userDomain.addModule).to.be.a('function');
    });
  });
});
