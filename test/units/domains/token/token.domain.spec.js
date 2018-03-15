'use strict';

const mongoose = require('mongoose');

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);

const TokenDomain = require('../../../../src/domains/token/token.domain');

describe('TokenDomain', function () {
  it('should be a function', function () {
    expect(TokenDomain).to.be.a('function');
  });

  describe('api', function () {
    beforeEach(function () {
      this.connection = mongoose.createConnection();
      this.db = { connection: () => this.connection };
      this.tokenDomain = new TokenDomain(this.db);
    });

    it('should expose the module api', function () {
      expect(this.tokenDomain.addModule).to.be.a('function');
    });
  });
});
