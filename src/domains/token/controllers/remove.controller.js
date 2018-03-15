'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;

class TokenRemoveController extends Controller {
  constructor (tokenService, config) {
    super(config);
    this._tokenService = tokenService;
  }

  handle (event, context, logger) {
    return this._tokenService.remove(event.params.id, logger)
      .then((data) => {
        return new Result(data);
      });
  }
}

module.exports = TokenRemoveController;
