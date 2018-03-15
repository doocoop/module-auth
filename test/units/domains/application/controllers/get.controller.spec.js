'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const ApplicationGetController = require('../../../../../src/domains/application/controllers/get.controller');

describe('ApplicationGetController', function () {
  it('should be a function', function () {
    expect(ApplicationGetController).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.application = {
        asData: () => ({ foo: 'bar' })
      };
      this.applicationService = {
        get: sinon.stub()
      };
      this.controller = new ApplicationGetController(this.applicationService);
      this.event = {
        params: { id: 'foobar' }
      };
    });

    describe('when get() resolves with an application', function () {
      beforeEach(function () {
        this.applicationService.get.resolves(this.application);
        this.promise = this.controller.handle(this.event);
      });

      it('should resolve with the application', function () {
        const expected = {
          _data: this.application.asData(),
          _meta: undefined
        };
        return expect(this.promise).to.eventually.deep.equal(expected);
      });
    });

    describe('when get() resolves with undefined', function () {
      beforeEach(function () {
        this.applicationService.get.resolves();
        this.promise = this.controller.handle(this.event);
      });

      it('should reject with same error', function () {
        return expect(this.promise).to.be.rejectedWith('not-found');
      });
    });

    describe('when get() rejects', function () {
      beforeEach(function () {
        this.error = new Error('foobar');
        this.applicationService.get.rejects(this.error);
        this.promise = this.controller.handle(this.event);
      });

      it('should reject with same error', function () {
        return expect(this.promise).to.be.rejectedWith(this.error);
      });
    });
  });
});
