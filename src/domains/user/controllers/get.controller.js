'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;
const ApplicationError = monkfish.errors.ApplicationError;

class UserGetController extends Controller {
  constructor (userService, config) {
    super(config);
    this._userService = userService;
  }

  handle (event, context, logger) {
    return this._userService.get(event.params.id, logger)
      .then((user) => {
        if (!user) {
          throw new ApplicationError('doocoop.resource.not-found', 'warn', { resource: 'doocoop.resource.user' });
        }
        return new Result(user.asData());
      });
  }
}

module.exports = UserGetController;
