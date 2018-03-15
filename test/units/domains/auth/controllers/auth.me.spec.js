'use strict';

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const AuthMeController = require('../../../../../src/domains/auth/controllers/me.controller');

describe('AuthMeController', function () {
  it('should be a function', function () {
    expect(AuthMeController).to.be.a('function');
  });

  describe('api', function () {
    beforeEach(function () {
      this.authMeController = new AuthMeController();
    });

    it('should expose the event handler', function () {
      expect(this.authMeController.handle).to.be.a('function');
    });
  });
});
