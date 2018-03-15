'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;

class TokenListController extends Controller {
  constructor (tokenService, config) {
    super(config);
    this._tokenService = tokenService;
  }

  handle (event, context, logger) {
    return this._tokenService.list(event.params, logger)
      .then((tokens) => {
        return new Result(tokens.map((token) => token.asData()));
      });
  }
}

module.exports = TokenListController;
