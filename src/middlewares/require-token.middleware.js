'use strict';

const monkfish = require('@cork-labs/monkfish');
const Middleware = monkfish.Middleware;
const ApplicationError = monkfish.errors.ApplicationError;

class RequireTokenMiddleware extends Middleware {
  getAllowedErrors () {
    return ['doocoop.auth.token-required'];
  }

  handle (event, context, logger) {
    if (!context.rawAccessToken) {
      throw new ApplicationError('doocoop.auth.token-required', 'warn');
    }
  }
}

module.exports = RequireTokenMiddleware;
