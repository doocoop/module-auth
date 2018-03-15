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
    config = _.merge({}, defaults, config);
    super();

    const tokenModel = new TokenModel(db, config.models.token);
    const tokenService = new TokenService(tokenModel, config.services.token);

    this.addModel('token', tokenModel);
    this.addService('token', tokenService);

    this.addPreMiddleware(RequireTokenMiddleware);
    this.addPreMiddleware(VerifyTokenMiddleware);
    this.addPreMiddleware(RequireVerifiedTokenMiddleware);

    this.addHandler('token.list', {
      controller: new TokenList(tokenService, config.controllers.list)
    });

    this.addHandler('token.get', {
      controller: new TokenGet(tokenService, config.controllers.get)
    });

    this.addHandler('token.create', {
      controller: new TokenCreate(tokenService, config.controllers.create)
    });

    this.addHandler('token.update', {
      controller: new TokenUpdate(tokenService, config.controllers.update)
    });

    this.addHandler('token.remove', {
      controller: new TokenRemove(tokenService, config.controllers.delete)
    });
  }
}

module.exports = TokenDomain;
