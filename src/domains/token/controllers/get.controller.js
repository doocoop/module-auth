'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;
const ApplicationError = monkfish.errors.ApplicationError;

class TokenGetController extends Controller {
  constructor (tokenService, config) {
    super(config);
    this._tokenService = tokenService;
  }

  getAllowedErrors () {
    return ['doocoop.resource.not-found'];
  }

  handle (event, context, logger) {
    return this._tokenService.get(event.params.id, logger)
      .then((token) => {
        if (!token) {
          throw new ApplicationError('doocoop.resource.not-found', 'warn', { resource: 'doocoop.resource.token' });
        }
        return new Result(token.asData());
      });
  }
}

module.exports = TokenGetController;
