'use strict';

const monkfish = require('@cork-labs/monkfish');
const Middleware = monkfish.Middleware;
const ApplicationError = monkfish.errors.ApplicationError;

class RequireVerifiedTokenMiddleware extends Middleware {
  handle (event, context, logger) {
    if (!context.accessToken) {
      if (context.accessTokenError) {
        throw new ApplicationError('doocoop.auth.token-invalid', 'warn', context.accessTokenError);
      } else {
        throw new ApplicationError('doocoop.auth.token-required', 'warn');
      }
    }
  }
}

module.exports = RequireVerifiedTokenMiddleware;
