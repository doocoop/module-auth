'use strict';

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const AuthLoginController = require('../../../../../src/domains/auth/controllers/login.controller');

describe('AuthLoginController', function () {
  it('should be a function', function () {
    expect(AuthLoginController).to.be.a('function');
  });

  describe('api', function () {
    beforeEach(function () {
      this.authLoginController = new AuthLoginController();
    });

    it('should expose the event handler', function () {
      expect(this.authLoginController.handle).to.be.a('function');
    });
  });
});
