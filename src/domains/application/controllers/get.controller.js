'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;
const ApplicationError = monkfish.errors.ApplicationError;

class ApplicationGetController extends Controller {
  constructor (applicationService, config) {
    super(config);
    this._applicationService = applicationService;
  }

  handle (event, context, logger) {
    return this._applicationService.get(event.params.id, logger)
      .then((application) => {
        if (!application) {
          throw new ApplicationError('doocoop.resource.not-found', 'warn', { resource: 'doocoop.resource.application' });
        }
        return new Result(application.asData());
      });
  }
}

module.exports = ApplicationGetController;
