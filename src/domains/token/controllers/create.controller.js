'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;

class TokenCreateController extends Controller {
  constructor (tokenService, config) {
    super(config);
    this._tokenService = tokenService;
  }

  handle (event, context, logger) {
    const token = this._tokenService.model(event.data);
    return this._tokenService.create(token, logger)
      .then((token) => {
        return new Result(token.asData());
      });
  }
}

module.exports = TokenCreateController;
