'use strict';

const mongoose = require('mongoose');

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);

const TokenModel = require('../../../../src/domains/token/token.model');

describe('TokenModel', function () {
  it('should be a function', function () {
    expect(TokenModel).to.be.a('function');
  });

  describe('api', function () {
    beforeEach(function () {
      this.connection = mongoose.createConnection();
      this.db = { connection: () => this.connection };
      this.tokenModel = new TokenModel(this.db);
    });

    it('should expose the mongoose api', function () {
      expect(this.tokenModel.create).to.be.a('function');
    });
  });
});
