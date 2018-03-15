'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const UserListController = require('../../../../../src/domains/user/controllers/list.controller');

describe('UserListController', function () {
  it('should be a function', function () {
    expect(UserListController).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.user = {
        asData: () => ({ foo: 'bar' })
      };
      this.userService = {
        list: sinon.stub()
      };
      this.controller = new UserListController(this.userService);
      this.event = {
        params: { id: 'foobar' }
      };
    });

    describe('when list() resolves with a result', function () {
      beforeEach(function () {
        this.userService.list.resolves([this.user]);
        this.promise = this.controller.handle(this.event);
      });

      it('should resolve with the result', function () {
        const expected = {
          _data: [this.user.asData()],
          _meta: undefined
        };
        return expect(this.promise).to.eventually.deep.equal(expected);
      });
    });

    describe('when list() rejects', function () {
      beforeEach(function () {
        this.error = new Error('foobar');
        this.userService.list.rejects(this.error);
        this.promise = this.controller.handle(this.event);
      });

      it('should reject with same error', function () {
        return expect(this.promise).to.be.rejectedWith(this.error);
      });
    });
  });
});
