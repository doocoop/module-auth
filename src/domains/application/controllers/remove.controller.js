'use strict';

const monkfish = require('@cork-labs/monkfish');

const Result = monkfish.classes.Result;
const Controller = monkfish.Controller;

class ApplicationRemoveController extends Controller {
  constructor (applicationService, config) {
    super(config);
    this._applicationService = applicationService;
  }

  handle (event, context, logger) {
    return this._applicationService.remove(event.params.id, logger)
      .then((data) => {
        return new Result(data);
      });
  }
}

module.exports = ApplicationRemoveController;
