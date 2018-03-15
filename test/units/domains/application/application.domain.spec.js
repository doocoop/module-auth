'use strict';

const mongoose = require('mongoose');

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);

const ApplicationDomain = require('../../../../src/domains/application/application.domain');

describe('ApplicationDomain', function () {
  it('should be a function', function () {
    expect(ApplicationDomain).to.be.a('function');
  });

  describe('api', function () {
    beforeEach(function () {
      this.connection = mongoose.createConnection();
      this.db = { connection: () => this.connection };
      this.applicationDomain = new ApplicationDomain(this.db);
    });

    it('should expose the module api', function () {
      expect(this.applicationDomain.addModule).to.be.a('function');
    });
  });
});
