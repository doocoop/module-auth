'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const UserGetController = require('../../../../../src/domains/user/controllers/get.controller');

describe('UserGetController', function () {
  it('should be a function', function () {
    expect(UserGetController).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.user = {
        asData: () => ({ foo: 'bar' })
      };
      this.userService = {
        get: sinon.stub()
      };
      this.controller = new UserGetController(this.userService);
      this.event = {
        params: { id: 'foobar' }
      };
    });

    describe('when get() resolves with an user', function () {
      beforeEach(function () {
        this.userService.get.resolves(this.user);
        this.promise = this.controller.handle(this.event);
      });

      it('should resolve with the user', function () {
        const expected = {
          _data: this.user.asData(),
          _meta: undefined
        };
        return expect(this.promise).to.eventually.deep.equal(expected);
      });
    });

    describe('when get() resolves with undefined', function () {
      beforeEach(function () {
        this.userService.get.resolves();
        this.promise = this.controller.handle(this.event);
      });

      it('should reject with same error', function () {
        return expect(this.promise).to.be.rejectedWith('not-found');
      });
    });

    describe('when get() rejects', function () {
      beforeEach(function () {
        this.error = new Error('foobar');
        this.userService.get.rejects(this.error);
        this.promise = this.controller.handle(this.event);
      });

      it('should reject with same error', function () {
        return expect(this.promise).to.be.rejectedWith(this.error);
      });
    });
  });
});
