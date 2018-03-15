'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;

class ApplicationListController extends Controller {
  constructor (applicationService, config) {
    super(config);
    this._applicationService = applicationService;
  }

  handle (event, context, logger) {
    return this._applicationService.list(event.params, logger)
      .then((applications) => {
        return new Result(applications.map((application) => application.asData()));
      });
  }
}

module.exports = ApplicationListController;
