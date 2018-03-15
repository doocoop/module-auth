'use strict';

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const AuthLogoutController = require('../../../../../src/domains/auth/controllers/logout.controller');

describe('AuthLogoutController', function () {
  it('should be a function', function () {
    expect(AuthLogoutController).to.be.a('function');
  });

  describe('api', function () {
    beforeEach(function () {
      this.authLoginController = new AuthLogoutController();
    });

    it('should expose the event handler', function () {
      expect(this.authLoginController.handle).to.be.a('function');
    });
  });
});
