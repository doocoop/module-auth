'use strict';

const monkfish = require('@cork-labs/monkfish');
const Middleware = monkfish.Middleware;

class VerifyTokenMiddleware extends Middleware {
  constructor (tokenService) {
    super();
    this._tokenService = tokenService;
  }

  handle (event, context, logger) {
    return this._tokenService.verify(context.rawAccessToken)
      .then(token => {
        context.accessToken = token;
      })
      .catch((err) => {
        context.accessTokenError = err.message;
      });
  }
}

module.exports = VerifyTokenMiddleware;
