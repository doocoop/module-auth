'use strict';

const mongoose = require('mongoose');

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);

const ApplicationDomain = require('../../../../src/domains/application/application.model');

describe('ApplicationDomain', function () {
  it('should be a function', function () {
    expect(ApplicationDomain).to.be.a('function');
  });

  describe('api', function () {
    beforeEach(function () {
      this.connection = mongoose.createConnection();
      this.db = { connection: () => this.connection };
      this.applicationModel = new ApplicationDomain(this.db);
    });

    it('should expose the mongoose api', function () {
      expect(this.applicationModel.create).to.be.a('function');
    });
  });
});
