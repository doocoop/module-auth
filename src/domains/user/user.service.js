'use strict';

const _ = require('lodash');

const defaults = {};

class UserService {
  constructor (userModel, config) {
    this._config = _.merge({}, defaults, config);
    this._userModel = userModel;
  }

  model (data) {
    return new this._userModel(data);
  }

  list (params, logger) {
    return this._userModel.find(params);
  }

  get (id, logger) {
    return this._userModel.findOne({_id: id});
  }

  create (instance, logger) {
    return instance.save();
  }

  update (id, data, logger) {
    const updates = {
      $set: data
    };
    return this._userModel.findAndUpdateOne({_id: id}, updates);
  }

  remove (id, logger) {
    return this._userModel.remove({_id: id});
  }
}

module.exports = UserService;
