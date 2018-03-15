'use strict';

const monkfish = require('@cork-labs/monkfish');
const Middleware = monkfish.Middleware;
const ApplicationError = monkfish.errors.ApplicationError;

class RequireNoTokenMiddleware extends Middleware {
  handle (event, context, logger) {
    if (context.rawAccessToken) {
      throw new ApplicationError('doocoop.auth.token-not-allowed', 'warn');
    }
  }
}

module.exports = RequireNoTokenMiddleware;
