'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;

class UserRemoveController extends Controller {
  constructor (userService, config) {
    super(config);
    this._userService = userService;
  }

  handle (event, context, logger) {
    return this._userService.remove(event.params.id, logger)
      .then((data) => {
        return new Result(data);
      });
  }
}

module.exports = UserRemoveController;
