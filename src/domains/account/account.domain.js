'use strict';

const _ = require('lodash');

const monkfish = require('@cork-labs/monkfish');
const Module = monkfish.Module;

const AccountModel = require('./account.model');
const AccountService = require('./account.service');

const AccountList = require('./controllers/list.controller');
const AccountGet = require('./controllers/get.controller');
const AccountCreate = require('./controllers/create.controller');
const AccountUpdate = require('./controllers/update.controller');
const AccountRemove = require('./controllers/remove.controller');

const RequireTokenMiddleware = require('../../middlewares/require-token.middleware');
const VerifyTokenMiddleware = require('../../middlewares/verify-token.middleware');
const RequireVerifiedTokenMiddleware = require('../../middlewares/require-verified-token.middleware');

const defaults = {
  controllers: {},
  services: {},
  models: {}
};

class AccountDomain extends Module {
  constructor (db, config) {
    config = _.merge({}, defaults, config);
    super();

    const accountModel = new AccountModel(db, config.models.account);
    const accountService = new AccountService(accountModel, config.services.account);

    this.addModel('account', accountModel);
    this.addService('account', accountService);

    this.addPreMiddleware(RequireTokenMiddleware);
    this.addPreMiddleware(VerifyTokenMiddleware);
    this.addPreMiddleware(RequireVerifiedTokenMiddleware);

    this.addHandler('account.list', {
      controller: new AccountList(accountService, config.controllers.list)
    });

    this.addHandler('account.get', {
      controller: new AccountGet(accountService, config.controllers.get)
    });

    this.addHandler('account.create', {
      controller: new AccountCreate(accountService, config.controllers.create)
    });

    this.addHandler('account.update', {
      controller: new AccountUpdate(accountService, config.controllers.update)
    });

    this.addHandler('account.remove', {
      controller: new AccountRemove(accountService, config.controllers.delete)
    });

    // this.before('account.*', ['parseToken']);
  }
}

module.exports = AccountDomain;
