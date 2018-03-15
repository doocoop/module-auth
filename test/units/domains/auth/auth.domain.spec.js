'use strict';

const mongoose = require('mongoose');

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const AuthDomain = require('../../../../src/domains/auth/auth.domain');

describe('AuthDomain', function () {
  it('should be a function', function () {
    expect(AuthDomain).to.be.a('function');
  });

  describe('api', function () {
    beforeEach(function () {
      this.userDomain = {
        getModel: sinon.spy(),
        getService: sinon.spy()
      };
      this.tokenDomain = {
        getModel: sinon.spy(),
        getService: sinon.spy()
      };
      this.connection = mongoose.createConnection();
      this.db = { connection: () => this.connectio };
      this.authDomain = new AuthDomain(this.db, this.userDomain, this.tokenDomain);
    });

    it('should expose the module api', function () {
      expect(this.authDomain.addModule).to.be.a('function');
    });
  });
});
