'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
// const Result = monkfish.classes.Result;
// const ApplicationError = monkfish.errors.ApplicationError;

class AuthLogoutController extends Controller {
  constructor (authService, tokenService, config) {
    super(config);
    this._authService = authService;
    this._tokenService = tokenService;
  }

  handle (event, context, logger) {
    if (context.accessToken && context.accessToken.jti) {
      return this._tokenService.remove(context.accessToken.jti);
    }
  }
}

module.exports = AuthLogoutController;
