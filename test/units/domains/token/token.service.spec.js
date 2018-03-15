'use strict';

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);

const TokenService = require('../../../../src/domains/token/token.service');

describe('TokenService', function () {
  it('should be a function', function () {
    expect(TokenService).to.be.a('function');
  });

  describe('model()', function () {
    beforeEach(function () {
      this.TokenModel = function TokenModel (data) {
        Object.assign(this, data);
      };
      this.tokenService = new TokenService(this.TokenModel);
      this.data = { foo: 'bar' };
      this.instance = this.tokenService.model(this.data);
    });

    it('should return an instance', function () {
      expect(this.instance).to.be.instanceOf(this.TokenModel);
      expect(this.instance.foo).to.equal('bar');
    });
  });
});
