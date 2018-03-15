'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;

class UserUpdateController extends Controller {
  constructor (userService, config) {
    super(config);
    this._userService = userService;
  }

  handle (event, context, logger) {
    return this._userService.update(event.params.id, event.data, logger)
      .then((user) => {
        return new Result(user.asData());
      });
  }
}

module.exports = UserUpdateController;
