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
    config = _.merge({}, defaults, config);
    super();

    const userModel = new UserModel(db, config.models.user);
    const userService = new UserService(userModel, config.services.user);

    this.addModel('user', userModel);
    this.addService('user', userService);

    this.addPreMiddleware(RequireTokenMiddleware);
    this.addPreMiddleware(VerifyTokenMiddleware);
    this.addPreMiddleware(RequireVerifiedTokenMiddleware);

    this.addHandler('user.list', {
      controller: new UserList(userService, config.controllers.list)
    });

    this.addHandler('user.get', {
      controller: new UserGet(userService, config.controllers.get)
    });

    this.addHandler('user.create', {
      controller: new UserCreate(userService, config.controllers.create)
    });

    this.addHandler('user.update', {
      controller: new UserUpdate(userService, config.controllers.update)
    });

    this.addHandler('user.remove', {
      controller: new UserRemove(userService, config.controllers.delete)
    });
  }
}

module.exports = UserDomain;
