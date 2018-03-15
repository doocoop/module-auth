'use strict';

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);

const ApplicationService = require('../../../../src/domains/application/application.service');

describe('ApplicationService', function () {
  it('should be a function', function () {
    expect(ApplicationService).to.be.a('function');
  });

  describe('model()', function () {
    beforeEach(function () {
      this.applicationModel = function applicationModel (data) {
        Object.assign(this, data);
      };
      this.applicationService = new ApplicationService(this.applicationModel);
      this.data = { foo: 'bar' };
      this.instance = this.applicationService.model(this.data);
    });

    it('should return an instance', function () {
      expect(this.instance).to.be.instanceOf(this.applicationModel);
      expect(this.instance.foo).to.equal('bar');
    });
  });
});
