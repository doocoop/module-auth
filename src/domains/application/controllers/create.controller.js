'use strict';

const monkfish = require('@cork-labs/monkfish');

const Controller = monkfish.Controller;
const Result = monkfish.classes.Result;

class ApplicationCreateController extends Controller {
  constructor (applicationService, config) {
    super(config);
    this._applicationService = applicationService;
  }

  handle (event, context, logger) {
    const application = this._applicationService.model(event.data);
    return this._applicationService.create(application, logger)
      .then((application) => {
        return new Result(application.asData());
      });
  }
}

module.exports = ApplicationCreateController;
