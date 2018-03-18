'use strict';

const _ = require('lodash');

const monkfish = require('@cork-labs/monkfish');
const Module = monkfish.Module;

const UserModel = require('./user.model');
const UserService = require('./user.service');

const UserList = require('./controllers/list.controller');
const UserGet = require('./controllers/get.controller');
const UserCreate = require('./controllers/create.controller');
const UserUpdate = require('./controllers/update.controller');
const UserRemove = require('./controllers/remove.controller');

const RequireTokenMiddleware = require('../../middlewares/require-token.middleware');
const VerifyTokenMiddleware = require('../../middlewares/verify-token.middleware');
const RequireVerifiedTokenMiddleware = require('../../middlewares/require-verified-token.middleware');

const defaults = {
  controllers: {},
  services: {},
  models: {}
};

class UserDomain extends Module {
  constructor (db, config) {
    super(_.merge({}, defaults, config));
    const $c = this._config;

    const userModel = new UserModel(db, $c.models.user);
    const userService = new UserService(userModel, $c.services.user);

    this.addModel('user', userModel);
    this.addService('user', userService);

    this.addPreMiddleware(RequireTokenMiddleware);
    this.addPreMiddleware(VerifyTokenMiddleware);
    this.addPreMiddleware(RequireVerifiedTokenMiddleware);

    this.addHandler('user.list', {
      controller: new UserList(userService, $c.controllers.list)
    });

    this.addHandler('user.get', {
      controller: new UserGet(userService, $c.controllers.get)
    });

    this.addHandler('user.create', {
      controller: new UserCreate(userService, $c.controllers.create)
    });

    this.addHandler('user.update', {
      controller: new UserUpdate(userService, $c.controllers.update)
    });

    this.addHandler('user.remove', {
      controller: new UserRemove(userService, $c.controllers.delete)
    });
  }
}

module.exports = UserDomain;
