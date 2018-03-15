'use strict';

const monkfish = require('@cork-labs/monkfish');
const Middleware = monkfish.Middleware;
const ApplicationError = monkfish.errors.ApplicationError;

class VerifyApplicationMiddleware extends Middleware {
  constructor (applicationService) {
    super();
    this._applicationService = applicationService;
  }

  handle (event, context, logger) {
    return this._applicationService.get(context.applicationId)
      .then(application => {
        if (!application) {
          throw new ApplicationError('doocoop.auth.application-unknown', 'warn');
        }
        if (context.origin && application.origins.indexOf(context.origin) === -1) {
          throw new ApplicationError('doocoop.auth.application-origin-invalid', 'warn');
        }
        context.application = application;
      });
  }
}

module.exports = VerifyApplicationMiddleware;
