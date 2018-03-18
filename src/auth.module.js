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
  domains: {
    account: {},
    application: {},
    auth: {},
    user: {}
  },
  middlewares: {}
};

class AuthModule extends Module {
  constructor (db, config) {
    super(_.merge({}, defaults, config));
    const $c = this._config;

    const userDomain = new UserDomain(db, $c.domains.user);
    const tokenDomain = new TokenDomain(db, $c.domains.token);
    const accountDomain = new AccountDomain(db, $c.domains.account);
    const applicationDomain = new ApplicationDomain(db, $c.domains.application);
    const authDomain = new AuthDomain(db, userDomain, tokenDomain, $c.domains.auth);

    this.addModule(userDomain);
    this.addModule(tokenDomain);
    this.addModule(accountDomain);
    this.addModule(applicationDomain);
    this.addModule(authDomain);

    const tokenService = tokenDomain.getService('token');
    const applicationService = applicationDomain.getService('application');

    this.addMiddleware(new RequireTokenMiddleware($c.requireToken));
    this.addMiddleware(new RequireNoTokenMiddleware($c.requireNoToken));
    this.addMiddleware(new VerifyTokenMiddleware(tokenService, $c.verifyToken));
    this.addMiddleware(new RequireVerifiedTokenMiddleware($c.requireVerifiedToken));
    this.addMiddleware(new RequireApplicationMiddleware($c.requireApplication));
    this.addMiddleware(new VerifyApplicationMiddleware(applicationService, $c.verifyApplication));
  };
}

module.exports = AuthModule;
