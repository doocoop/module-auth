'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;

class ApplicationUpdateController extends Controller {
  constructor (applicationService, config) {
    super(config);
    this._applicationService = applicationService;
  }

  handle (event, context, logger) {
    return this._applicationService.update(event.params.id, event.data, logger)
      .then((application) => {
        return new Result(application.asData());
      });
  }
}

module.exports = ApplicationUpdateController;
