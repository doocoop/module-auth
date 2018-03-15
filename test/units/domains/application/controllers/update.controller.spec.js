'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const ApplicationUpdateController = require('../../../../../src/domains/application/controllers/update.controller');

describe('ApplicationUpdateController', function () {
  it('should be a function', function () {
    expect(ApplicationUpdateController).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.application = {
        asData: () => ({ foo: 'bar' })
      };
      this.applicationService = {
        update: sinon.stub()
      };
      this.controller = new ApplicationUpdateController(this.applicationService);
      this.event = {
        params: { id: 'foobar' }
      };
    });

    describe('when update() resolves with a result', function () {
      beforeEach(function () {
        this.applicationService.update.resolves(this.application);
        this.promise = this.controller.handle(this.event);
      });

      it('should resolve with the result', function () {
        const expected = {
          _data: this.application.asData(),
          _meta: undefined
        };
        return expect(this.promise).to.eventually.deep.equal(expected);
      });
    });

    describe('when update() rejects', function () {
      beforeEach(function () {
        this.error = new Error('foobar');
        this.applicationService.update.rejects(this.error);
        this.promise = this.controller.handle(this.event);
      });

      it('should reject with same error', function () {
        return expect(this.promise).to.be.rejectedWith(this.error);
      });
    });
  });
});
