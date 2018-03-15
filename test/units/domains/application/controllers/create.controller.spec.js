'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const ApplicationCreateController = require('../../../../../src/domains/application/controllers/create.controller');

describe('applicationCreateController', function () {
  it('should be a function', function () {
    expect(ApplicationCreateController).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.application = {
        asData: () => ({ foo: 'bar' })
      };
      this.applicationService = {
        model: sinon.stub().returns(this.application),
        create: sinon.stub()
      };
      this.controller = new ApplicationCreateController(this.applicationService);
      this.event = {
        data: { baz: 'qux' }
      };
    });

    describe('when create() resolves', function () {
      beforeEach(function () {
        this.applicationService.create.resolves(this.application);
        this.promise = this.controller.handle(this.event);
      });

      it('should create an application', function () {
        const expected = {
          _data: this.application.asData(),
          _meta: undefined
        };
        return expect(this.promise).to.eventually.deep.equal(expected);
      });
    });

    describe('when create() rejects', function () {
      beforeEach(function () {
        this.error = new Error('foobar');
        this.applicationService.create.rejects(this.error);
        this.promise = this.controller.handle(this.event);
      });

      it('should reject with same error', function () {
        return expect(this.promise).to.be.rejectedWith(this.error);
      });
    });
  });
});
