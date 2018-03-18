'use strict';

const _ = require('lodash');
const jwt = require('jsonwebtoken');

const JWT = require('./classes/jwt');

const defaults = {
  secret: 'doocoop',
  ttl: 60 * 60,
  audience: 'doocoop.auth',
  issuer: 'doocoop.auth'
};

class TokenService {
  constructor (tokenModel, config) {
    this._config = _.merge({}, defaults, config);
    this._tokenModel = tokenModel;
  }

  model (data) {
    return new this._tokenModel(data);
  }

  list (params, logger) {
    return this._tokenModel.find(params);
  }

  get (id, logger) {
    return this._tokenModel.findOne({_id: id});
  }

  create (instance, logger) {
    return instance.save();
  }

  createUserToken (user, application, logger) {
    const claims = {
      audience: this._config.audience
    };
    const data = {
      account: application.account,
      application: application,
      user,
      expires: Date.now() + this._config.ttl * 1000,
      claims
    };
    const token = this.model(data);
    return this.create(token);
  }

  getJWT (token) {
    return new JWT(jwt, this._config.secret, token);
  };

  update (id, data, logger) {
    const updates = {
      $set: data
    };
    return this._tokenModel.findAndUpdateOne({_id: id}, updates);
  }

  remove (id, logger) {
    return this._tokenModel.remove({_id: id});
  }

  verify (token) {
    return Promise.resolve()
      .then(() => jwt.verify(token, this._config.secret));
  }
}

module.exports = TokenService;
