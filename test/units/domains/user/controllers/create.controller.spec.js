'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const UserCreateController = require('../../../../../src/domains/user/controllers/create.controller');

describe('UserCreateController', function () {
  it('should be a function', function () {
    expect(UserCreateController).to.be.a('function');
  });

  describe('handle()', function () {
    beforeEach(function () {
      this.user = {
        asData: () => ({ foo: 'bar' })
      };
      this.userService = {
        model: sinon.stub().returns(this.user),
        create: sinon.stub()
      };
      this.controller = new UserCreateController(this.userService);
      this.event = {
        data: { baz: 'qux' }
      };
    });

    describe('when create() resolves', function () {
      beforeEach(function () {
        this.userService.create.resolves(this.user);
        this.promise = this.controller.handle(this.event);
      });

      it('should create an user', function () {
        const expected = {
          _data: this.user.asData(),
          _meta: undefined
        };
        return expect(this.promise).to.eventually.deep.equal(expected);
      });
    });

    describe('when create() rejects', function () {
      beforeEach(function () {
        this.error = new Error('foobar');
        this.userService.create.rejects(this.error);
        this.promise = this.controller.handle(this.event);
      });

      it('should reject with same error', function () {
        return expect(this.promise).to.be.rejectedWith(this.error);
      });
    });
  });
});
