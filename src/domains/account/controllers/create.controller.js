'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;

class AccountCreateController extends Controller {
  constructor (accountService, config) {
    super(config);
    this._accountService = accountService;
  }

  handle (event, context, logger) {
    const account = this._accountService.model(event.data);
    return this._accountService.create(account, logger)
      .then((account) => {
        return new Result(account.asData());
      });
  }
}

module.exports = AccountCreateController;
