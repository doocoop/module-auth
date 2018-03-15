'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;

class UserListController extends Controller {
  constructor (userService, config) {
    super(config);
    this._userService = userService;
  }

  handle (event, context, logger) {
    return this._userService.list(event.params, logger)
      .then((users) => {
        return new Result(users.map((user) => user.asData()));
      });
  }
}

module.exports = UserListController;
