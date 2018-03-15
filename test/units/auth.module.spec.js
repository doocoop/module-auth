'use strict';

const mongoose = require('mongoose');

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);

const AuthModule = require('../../src/auth.module');

describe('AuthModule', function () {
  it('should be a function', function () {
    expect(AuthModule).to.be.a('function');
  });

  describe('api', function () {
    beforeEach(function () {
      this.connection = mongoose.createConnection();
      this.db = { connection: () => this.connection };
      this.authModule = new AuthModule(this.db);
    });

    it('should expose the module api', function () {
      expect(this.authModule.addModule).to.be.a('function');
    });
  });
});
