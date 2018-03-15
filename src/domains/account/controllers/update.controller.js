'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;

class AccountUpdateController extends Controller {
  constructor (accountService, config) {
    super(config);
    this._accountService = accountService;
  }

  handle (event, context, logger) {
    return this._accountService.update(event.params.id, event.data, logger)
      .then((account) => {
        return new Result(account.asData());
      });
  }
}

module.exports = AccountUpdateController;
