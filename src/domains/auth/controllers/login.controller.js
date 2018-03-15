'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;
const ApplicationError = monkfish.errors.ApplicationError;

class AuthLoginController extends Controller {
  constructor (authService, tokenService, config) {
    super(config);
    this._authService = authService;
    this._tokenService = tokenService;
  }

  handle (event, context, logger) {
    return this._authService.findByCredentials(context.application._id, event.params.username, event.params.password, logger)
      .then((user) => {
        if (!user) {
          throw new ApplicationError('doocoop.auth.credentials-invalid', 'warn');
        }
        return { user };
      })
      .then((result) => {
        return this._tokenService.generateUserToken(result.user, context.application)
          .then(token => {
            result.token = token;
            return result;
          });
      })
      .then((result) => {
        return new Result({ id: result.token._model._id.toString() }, { token: result.token.sign() });
      });
  }
}

module.exports = AuthLoginController;
