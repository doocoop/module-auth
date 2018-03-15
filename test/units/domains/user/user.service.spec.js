'use strict';

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);

const UserService = require('../../../../src/domains/user/user.service');

describe('UserService', function () {
  it('should be a function', function () {
    expect(UserService).to.be.a('function');
  });

  describe('model()', function () {
    beforeEach(function () {
      this.UserModel = function UserModel (data) {
        Object.assign(this, data);
      };
      this.userService = new UserService(this.UserModel);
      this.data = { foo: 'bar' };
      this.instance = this.userService.model(this.data);
    });

    it('should return an instance', function () {
      expect(this.instance).to.be.instanceOf(this.UserModel);
      expect(this.instance.foo).to.equal('bar');
    });
  });
});
