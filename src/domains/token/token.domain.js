'use strict';

const _ = require('lodash');

const monkfish = require('@cork-labs/monkfish');
const Module = monkfish.Module;

const TokenModel = require('./token.model');
const TokenService = require('./token.service');

const TokenList = require('./controllers/list.controller');
const TokenGet = require('./controllers/get.controller');
const TokenCreate = require('./controllers/create.controller');
const TokenUpdate = require('./controllers/update.controller');
const TokenRemove = require('./controllers/remove.controller');

const RequireTokenMiddleware = require('../../middlewares/require-token.middleware');
const VerifyTokenMiddleware = require('../../middlewares/verify-token.middleware');
const RequireVerifiedTokenMiddleware = require('../../middlewares/require-verified-token.middleware');

const defaults = {
  controllers: {},
  services: {},
  models: {}
};

class TokenDomain extends Module {
  constructor (db, config) {
    super(_.merge({}, defaults, config));
    const $c = this._config;

    const tokenModel = new TokenModel(db, $c.models.token);
    const tokenService = new TokenService(tokenModel, $c.services.token);

    this.addModel('token', tokenModel);
    this.addService('token', tokenService);

    this.addPreMiddleware(RequireTokenMiddleware);
    this.addPreMiddleware(VerifyTokenMiddleware);
    this.addPreMiddleware(RequireVerifiedTokenMiddleware);

    this.addHandler('token.list', {
      controller: new TokenList(tokenService, $c.controllers.list)
    });

    this.addHandler('token.get', {
      controller: new TokenGet(tokenService, $c.controllers.get)
    });

    this.addHandler('token.create', {
      controller: new TokenCreate(tokenService, $c.controllers.create)
    });

    this.addHandler('token.update', {
      controller: new TokenUpdate(tokenService, $c.controllers.update)
    });

    this.addHandler('token.remove', {
      controller: new TokenRemove(tokenService, $c.controllers.delete)
    });
  }
}

module.exports = TokenDomain;
