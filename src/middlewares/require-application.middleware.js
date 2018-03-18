'use strict';

const monkfish = require('@cork-labs/monkfish');
const Middleware = monkfish.Middleware;
const ApplicationError = monkfish.errors.ApplicationError;

class RequireApplicationMiddleware extends Middleware {
  getAllowedErrors () {
    return ['doocoop.auth.application-required'];
  }

  handle (event, context, logger) {
    if (!context.applicationId) {
      throw new ApplicationError('doocoop.auth.application-required');
    }
  }
}

module.exports = RequireApplicationMiddleware;
