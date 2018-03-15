'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const ApplicationMock = require('@cork-labs/monkfish').ApplicationMock;
const MongooseAdapterMock = require('@cork-labs/monkfish-adapter-mongoose').MongooseAdapterMock;
const MongooseAdapterSeeder = require('@cork-labs/monkfish-adapter-mongoose').MongooseAdapterSeeder;

const AuthModule = require('../../../src/auth.module');

const fixtures = require('./auth.login.fixtures');

describe('auth.logout', function () {
  beforeEach(function () {
    this.logger = {
      info: sinon.spy(),
      error: sinon.spy()
    };
    this.db = new MongooseAdapterMock({ uri: 'mongodb://localhost/test' });
    return this.db.connect();
  });

  beforeEach(function () {
    this.application = new ApplicationMock();
    this.authModule = new AuthModule(this.db);
    this.application.addModule(this.authModule);
    return this.application.start();
  });

  beforeEach(function () {
    this.seeder = new MongooseAdapterSeeder();
    this.seeder.addModels(this.application.getModels());
    this.seeder.addServices(this.application.getServices());
    this.seeder.setVars(fixtures.vars);
    return this.seeder.seed(fixtures.docs);
  });

  afterEach(function () {
    return this.db.disconnect();
  });

  describe('when no token is provided', function () {
    beforeEach(function () {
      this.event = {
        type: 'auth.logout'
      };
      this.context = {};
      this.promise = this.application.handle(this.event, this.context, this.logger);
    });

    it('should resolve', function () {
      return expect(this.promise).to.eventually.equal(undefined);
    });
  });

  describe('when an active token is provided', function () {
    beforeEach(function () {
      this.event = {
        type: 'auth.login',
        params: this.seeder.get('valid_credentials')
      };
      this.context = {
        applicationId: this.seeder.get('application_root._id')
      };
      return this.application.handle(this.event, this.context, this.logger)
        .then(result => {
          this.token = result._meta.token;
        });
    });

    beforeEach(function () {
      this.event = {
        type: 'auth.logout'
      };
      this.context = {
        rawAccessToken: this.token
      };
      this.promise = this.application.handle(this.event, this.context, this.logger);
    });

    it('should resolve', function () {
      return expect(this.promise).to.eventually.equal(undefined);
    });
  });
});
