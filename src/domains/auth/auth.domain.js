'use strict';

const _ = require('lodash');

const monkfish = require('@cork-labs/monkfish');
const Module = monkfish.Module;

const AuthService = require('./auth.service');

const AuthMe = require('./controllers/me.controller');
const AuthLogin = require('./controllers/login.controller');
const AuthSignup = require('./controllers/signup.controller');
const AuthLogout = require('./controllers/logout.controller');

const RequireTokenMiddleware = require('../../middlewares/require-token.middleware');
const RequireNoTokenMiddleware = require('../../middlewares/require-no-token.middleware');
const VerifyTokenMiddleware = require('../../middlewares/verify-token.middleware');
const RequireVerifiedTokenMiddleware = require('../../middlewares/require-verified-token.middleware');
const RequireApplicationMiddleware = require('../../middlewares/require-application.middleware');
const VerifyApplicationMiddleware = require('../../middlewares/verify-application.middleware');

const defaults = {
  controllers: {},
  services: {},
  models: {}
};

class AuthDomain extends Module {
  constructor (db, userDomain, tokenDomain, config) {
    super(_.merge({}, defaults, config));
    const $c = this._config;

    const userModel = userDomain.getModel('user');
    const userService = userDomain.getService('user');
    const authService = new AuthService(userService, userModel, $c.services.auth);

    this.addService('auth', authService);

    const tokenService = tokenDomain.getService('token');

    this.addHandler('auth.me', {
      pre: [
        RequireTokenMiddleware,
        VerifyTokenMiddleware,
        RequireVerifiedTokenMiddleware,
        RequireApplicationMiddleware,
        VerifyApplicationMiddleware
      ],
      controller: new AuthMe(authService, $c.controllers.list)
    });

    this.addHandler('auth.login', {
      pre: [
        RequireNoTokenMiddleware,
        RequireApplicationMiddleware,
        VerifyApplicationMiddleware
      ],
      controller: new AuthLogin(authService, tokenService, $c.controllers.get)
    });

    this.addHandler('auth.signup', {
      pre: [
        RequireNoTokenMiddleware,
        RequireApplicationMiddleware,
        VerifyApplicationMiddleware
      ],
      controller: new AuthSignup(authService, $c.controllers.create)
    });

    this.addHandler('auth.logout', {
      pre: [
        VerifyTokenMiddleware
      ],
      controller: new AuthLogout(authService, tokenService, $c.controllers.update)
    });
  }
}

module.exports = AuthDomain;
