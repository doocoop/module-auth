'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const ApplicationListController = require('../../../../../src/domains/application/controllers/list.controller');

describe('ApplicationListController', function () {
  it('should be a function', function () {
    expect(ApplicationListController).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.application = {
        asData: () => ({ foo: 'bar' })
      };
      this.applicationService = {
        list: sinon.stub()
      };
      this.controller = new ApplicationListController(this.applicationService);
      this.event = {
        params: { id: 'foobar' }
      };
    });

    describe('when list() resolves with a result', function () {
      beforeEach(function () {
        this.applicationService.list.resolves([this.application]);
        this.promise = this.controller.handle(this.event);
      });

      it('should resolve with the result', function () {
        const expected = {
          _data: [this.application.asData()],
          _meta: undefined
        };
        return expect(this.promise).to.eventually.deep.equal(expected);
      });
    });

    describe('when list() rejects', function () {
      beforeEach(function () {
        this.error = new Error('foobar');
        this.applicationService.list.rejects(this.error);
        this.promise = this.controller.handle(this.event);
      });

      it('should reject with same error', function () {
        return expect(this.promise).to.be.rejectedWith(this.error);
      });
    });
  });
});
