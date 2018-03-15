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

describe('auth.login', function () {
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

  describe('when a token is provided', function () {
    beforeEach(function () {
      this.event = {
        type: 'auth.login'
      };
      this.context = {
        rawAccessToken: 'foobar'
      };
      this.promise = this.application.handle(this.event, this.context, this.logger);
    });

    it('should throw an error', function () {
      return expect(this.promise).to.be.rejectedWith('token-not-allowed');
    });
  });

  describe('when no application provided', function () {
    beforeEach(function () {
      this.event = {
        type: 'auth.login'
      };
      this.context = {};
      this.promise = this.application.handle(this.event, this.context, this.logger);
    });

    it('should throw an error', function () {
      return expect(this.promise).to.be.rejectedWith('application-required');
    });
  });

  describe('when an unknown application is provided', function () {
    beforeEach(function () {
      this.event = {
        type: 'auth.login'
      };
      this.context = {
        applicationId: '5aa48c1ecf5f5527847fe07a'
      };
      this.promise = this.application.handle(this.event, this.context, this.logger);
    });

    it('should throw an error', function () {
      return expect(this.promise).to.be.rejectedWith('application-unknown');
    });
  });

  describe('when a known application is provided, with an invalid origin', function () {
    beforeEach(function () {
      this.event = {
        type: 'auth.login',
        params: {}
      };
      this.context = {
        applicationId: this.seeder.get('application_root._id'),
        origin: 'foobar'
      };
      this.promise = this.application.handle(this.event, this.context, this.logger);
    });

    it('should throw an error', function () {
      return expect(this.promise).to.be.rejectedWith('doocoop.auth.application-origin-invalid');
    });
  });

  describe('when a known application and invalid credentials are provided', function () {
    beforeEach(function () {
      this.event = {
        type: 'auth.login',
        params: this.seeder.get('invalid_credentials')
      };
      this.context = {
        applicationId: this.seeder.get('application_root._id')
      };
      this.promise = this.application.handle(this.event, this.context, this.logger);
    });

    it('should throw an error', function () {
      return expect(this.promise).to.be.rejectedWith('doocoop.auth.credentials-invalid');
    });
  });

  describe('when a known application and valid crendetials are provided', function () {
    beforeEach(function () {
      this.event = {
        type: 'auth.login',
        params: this.seeder.get('valid_credentials')
      };
      this.context = {
        applicationId: this.seeder.get('application_root._id')
      };
      this.promise = this.application.handle(this.event, this.context, this.logger);
    });

    it('should resolve with a new token', function () {
      return this.promise.then((result) => {
        expect(result.data.id).to.be.a('string');
        expect(result._meta.token).to.be.a('string');
      });
    });
  });
});
