'use strict';

const mongoose = require('mongoose');

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);

const UserModel = require('../../../../src/domains/user/user.model');

describe('UserModel', function () {
  it('should be a function', function () {
    expect(UserModel).to.be.a('function');
  });

  describe('api', function () {
    beforeEach(function () {
      this.connection = mongoose.createConnection();
      this.db = { connection: () => this.connection };
      this.userModel = new UserModel(this.db);
    });

    it('should expose the mongoose api', function () {
      expect(this.userModel.create).to.be.a('function');
    });
  });
});
