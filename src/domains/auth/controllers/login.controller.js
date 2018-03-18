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

  getAllowedErrors () {
    return ['doocoop.auth.credentials-invalid'];
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
        return this._tokenService.createUserToken(result.user, context.application)
          .then(token => {
            result.token = token;
            result.jwt = this._tokenService.getJWT(result.token);
            return result;
          });
      })
      .then((result) => {
        return new Result({ tokenId: result.token._id.toString() }, { token: result.jwt.sign() });
      });
  }
}

module.exports = AuthLoginController;
