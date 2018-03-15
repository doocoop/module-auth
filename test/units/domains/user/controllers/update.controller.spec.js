'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const UserUpdateController = require('../../../../../src/domains/user/controllers/update.controller');

describe('UserUpdateController', function () {
  it('should be a function', function () {
    expect(UserUpdateController).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.user = {
        asData: () => ({ foo: 'bar' })
      };
      this.userService = {
        update: sinon.stub()
      };
      this.controller = new UserUpdateController(this.userService);
      this.event = {
        params: { id: 'foobar' }
      };
    });

    describe('when update() resolves with a result', function () {
      beforeEach(function () {
        this.userService.update.resolves(this.user);
        this.promise = this.controller.handle(this.event);
      });

      it('should resolve with the result', function () {
        const expected = {
          _data: this.user.asData(),
          _meta: undefined
        };
        return expect(this.promise).to.eventually.deep.equal(expected);
      });
    });

    describe('when update() rejects', function () {
      beforeEach(function () {
        this.error = new Error('foobar');
        this.userService.update.rejects(this.error);
        this.promise = this.controller.handle(this.event);
      });

      it('should reject with same error', function () {
        return expect(this.promise).to.be.rejectedWith(this.error);
      });
    });
  });
});
