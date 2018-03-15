'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;

class AccountRemoveController extends Controller {
  constructor (accountService, config) {
    super(config);
    this._accountService = accountService;
  }

  handle (event, context, logger) {
    return this._accountService.remove(event.params.id, logger)
      .then(() => {
        return new Result();
      });
  }
}

module.exports = AccountRemoveController;
