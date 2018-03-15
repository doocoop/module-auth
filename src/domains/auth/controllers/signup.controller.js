'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;
const ApplicationError = monkfish.errors.ApplicationError;

class AuthSignupController extends Controller {
  constructor (authService, config) {
    super(config);
    this._authService = authService;
  }

  handle (event, context, logger) {
    return this._authService.findByUsername(context.applicationId, event.data.username, logger)
      .then((user) => {
        if (user) {
          throw new ApplicationError('doocoop.auth.username-not-unique', 'warn');
        }
      })
      .then(() => this._authService.createWithCredentials(context.applicationId, event.data.username, event.data.password, logger))
      .then((user) => new Result(user.asData()));
  }
}

module.exports = AuthSignupController;
