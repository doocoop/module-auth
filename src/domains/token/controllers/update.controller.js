'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;

class TokenUpdateController extends Controller {
  constructor (tokenService, config) {
    super(config);
    this._tokenService = tokenService;
  }

  handle (event, context, logger) {
    return this._tokenService.update(event.params.id, event.data, logger)
      .then((token) => {
        return new Result(token.asData());
      });
  }
}

module.exports = TokenUpdateController;
