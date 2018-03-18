'use strict';

const _ = require('lodash');

const defaults = {};

class AccountService {
  constructor (accountModel, config) {
    this._config = _.merge({}, defaults, config);
    this._accountModel = accountModel;
  }

  model (data) {
    return new this._accountModel(data);
  }

  list (params, logger) {
    return this._accountModel.find(params);
  }

  get (id, logger) {
    return this._accountModel.findOne({_id: id});
  }

  create (instance, logger) {
    return instance.save();
  }

  update (id, data, logger) {
    const updates = {
      $set: data
    };
    return this._accountModel.findAndUpdateOne({_id: id}, updates);
  }

  remove (id, logger) {
    return this._accountModel.remove({_id: id});
  }
}

module.exports = AccountService;
