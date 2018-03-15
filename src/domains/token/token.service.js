'use strict';

const _ = require('lodash');
const jwt = require('jsonwebtoken');

const defaults = {
  secret: 'doocoop',
  audience: 'doocoop.auth',
  issuer: 'doocoop.auth'
};

class Token {
  constructor (secret, model, user) {
    this._secret = secret;
    this._model = model;
    this._user = user;
  }

  sign () {
    const options = Object.assign({}, this._model.claims, {
      jwtid: this._model._id.toString()
    });
    let payload = {};
    if (this._user) {
      options.subject = this._user._id.toString();
      payload = this._user.getIdentity();
    }
    return jwt.sign(payload, this._secret, options);
  }
}

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

  generateUserToken (user, application, logger) {
    const claims = {
      audience: this._config.audience,
      expiresIn: 86400
    };
    const data = {
      account: application.account,
      application: application,
      user,
      claims
    };
    const token = this.model(data);
    return this.create(token)
      .then(() => new Token(this._config.secret, token, user));
  }

  create (instance, logger) {
    return instance.save();
  }

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
