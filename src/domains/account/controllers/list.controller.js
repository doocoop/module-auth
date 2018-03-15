'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;

class AccountListController extends Controller {
  constructor (accountService, config) {
    super(config);
    this._accountService = accountService;
  }

  handle (event, context, logger) {
    return this._accountService.list(event.params, logger)
      .then((accounts) => {
        return new Result(accounts.map((account) => account.asData()));
      });
  }
}

module.exports = AccountListController;
