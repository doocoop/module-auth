'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;

class AuthMeController extends Controller {
  constructor (authService, config) {
    super(config);
    this._authService = authService;
  }

  handle (event, context, logger) {
    // requires token
    return new Result(context.accessToken);
  }
}

module.exports = AuthMeController;
