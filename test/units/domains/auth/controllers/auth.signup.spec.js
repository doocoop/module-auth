'use strict';

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const AuthSignupController = require('../../../../../src/domains/auth/controllers/signup.controller');

describe('AuthSignupController', function () {
  it('should be a function', function () {
    expect(AuthSignupController).to.be.a('function');
  });

  describe('api', function () {
    beforeEach(function () {
      this.authSignupController = new AuthSignupController();
    });

    it('should expose the event handler', function () {
      expect(this.authSignupController.handle).to.be.a('function');
    });
  });
});
