'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;
const ApplicationError = monkfish.errors.ApplicationError;

class AccountGetController extends Controller {
  constructor (accountService, config) {
    super(config);
    this._accountService = accountService;
  }

  handle (event, context, logger) {
    return this._accountService.get(event.params.id, logger)
      .then((account) => {
        if (!account) {
          throw new ApplicationError('doocoop.resource.not-found', 'warn', { resource: 'doocoop.resource.account' });
        }
        return new Result(account.asData());
      });
  }
}

module.exports = AccountGetController;
