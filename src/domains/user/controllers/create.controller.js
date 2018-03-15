'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;

class UserCreateController extends Controller {
  constructor (userService, config) {
    super(config);
    this._userService = userService;
  }

  handle (event, context, logger) {
    const user = this._userService.model(event.data);
    return this._userService.create(user, logger)
      .then((user) => {
        return new Result(user.asData());
      });
  }
}

module.exports = UserCreateController;
