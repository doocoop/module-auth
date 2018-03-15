'use strict';

class ApplicationService {
  constructor (applicationModel, config) {
    this._applicationModel = applicationModel;
  }

  model (data) {
    return new this._applicationModel(data);
  }

  list (params, logger) {
    return this._applicationModel.find(params);
  }

  get (id, logger) {
    return this._applicationModel.findOne({_id: id});
  }

  create (instance, logger) {
    return instance.save();
  }

  update (id, data, logger) {
    const updates = {
      $set: data
    };
    return this._applicationModel.findAndUpdateOne({_id: id}, updates);
  }

  remove (id, logger) {
    return this._applicationModel.remove({_id: id});
  }
}

module.exports = ApplicationService;
