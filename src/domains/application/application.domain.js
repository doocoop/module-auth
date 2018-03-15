'use strict';

const _ = require('lodash');

const monkfish = require('@cork-labs/monkfish');
const Module = monkfish.Module;

const ApplicationModel = require('./application.model');
const ApplicationService = require('./application.service');

const ApplicationList = require('./controllers/list.controller');
const ApplicationGet = require('./controllers/get.controller');
const ApplicationCreate = require('./controllers/create.controller');
const ApplicationUpdate = require('./controllers/update.controller');
const ApplicationRemove = require('./controllers/remove.controller');

const RequireTokenMiddleware = require('../../middlewares/require-token.middleware');
const VerifyTokenMiddleware = require('../../middlewares/verify-token.middleware');
const RequireVerifiedTokenMiddleware = require('../../middlewares/require-verified-token.middleware');

const defaults = {
  controllers: {},
  services: {},
  models: {}
};

class ApplicationDomain extends Module {
  constructor (db, config) {
    config = _.merge({}, defaults, config);
    super();

    const applicationModel = new ApplicationModel(db, config.models.application);
    const applicationService = new ApplicationService(applicationModel, config.services.application);

    this.addModel('application', applicationModel);
    this.addService('application', applicationService);

    this.addPreMiddleware(RequireTokenMiddleware);
    this.addPreMiddleware(VerifyTokenMiddleware);
    this.addPreMiddleware(RequireVerifiedTokenMiddleware);

    this.addHandler('application.list', {
      controller: new ApplicationList(applicationService, config.controllers.list)
    });

    this.addHandler('application.get', {
      controller: new ApplicationGet(applicationService, config.controllers.get)
    });

    this.addHandler('application.create', {
      controller: new ApplicationCreate(applicationService, config.controllers.create)
    });

    this.addHandler('application.update', {
      controller: new ApplicationUpdate(applicationService, config.controllers.update)
    });

    this.addHandler('application.remove', {
      controller: new ApplicationRemove(applicationService, config.controllers.delete)
    });
  }
}

module.exports = ApplicationDomain;
