'use strict';

const _ = require('lodash');

const monkfish = require('@cork-labs/monkfish');
const Module = monkfish.Module;

const UserDomain = require('./domains/user/user.domain');
const TokenDomain = require('./domains/token/token.domain');
const AccountDomain = require('./domains/account/account.domain');
const ApplicationDomain = require('./domains/application/application.domain');
const AuthDomain = require('./domains/auth/auth.domain');

const RequireTokenMiddleware = require('./middlewares/require-token.middleware');
const RequireNoTokenMiddleware = require('./middlewares/require-no-token.middleware');
const VerifyTokenMiddleware = require('./middlewares/verify-token.middleware');
const RequireVerifiedTokenMiddleware = require('./middlewares/require-verified-token.middleware');
const RequireApplicationMiddleware = require('./middlewares/require-application.middleware');
const VerifyApplicationMiddleware = require('./middlewares/verify-application.middleware');

const defaults = {
  account: {},
  application: {},
  auth: {},
  user: {}
};

class AuthModule extends Module {
  constructor (db, config) {
    config = _.merge({}, defaults, config);
    super();

    const userDomain = new UserDomain(db, config.user);
    const tokenDomain = new TokenDomain(db, config.token);
    const accountDomain = new AccountDomain(db, config.account);
    const applicationDomain = new ApplicationDomain(db, config.application);
    const authDomain = new AuthDomain(db, userDomain, tokenDomain, config.auth);

    this.addModule(userDomain);
    this.addModule(tokenDomain);
    this.addModule(accountDomain);
    this.addModule(applicationDomain);
    this.addModule(authDomain);

    this.addMiddleware(new RequireTokenMiddleware());
    this.addMiddleware(new RequireNoTokenMiddleware());
    this.addMiddleware(new VerifyTokenMiddleware(tokenDomain.getService('token')));
    this.addMiddleware(new RequireVerifiedTokenMiddleware());
    this.addMiddleware(new RequireApplicationMiddleware());
    this.addMiddleware(new VerifyApplicationMiddleware(applicationDomain.getService('application')));
  };
}

AuthModule.ERROR_MAP = {
  'monkfish.application.event-unknown': true,
  'doocoop.resource.not-found': true,
  'doocoop.auth.application-required': true,
  'doocoop.auth.application-unknown': true,
  'doocoop.auth.application-origin-invalid': true,
  'doocoop.auth.token-required': true,
  'doocoop.auth.token-not-allowed': true,
  'doocoop.auth.token-invalid': true,
  'doocoop.auth.username-not-unique': true,
  'doocoop.auth.credentials-invalid': true
};

module.exports = AuthModule;
