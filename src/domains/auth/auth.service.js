'use strict';

const bcrypt = require('bcrypt');

class AuthService {
  constructor (userService, userModel, config) {
    this._userService = userService;
    this._userModel = userModel;
  }

  findByUsername (applicationId, username, logger) {
    return this._userModel.findOne({ 'application': applicationId, 'credentials.username': { $exists: true, $eq: username } });
  }

  findByCredentials (applicationId, username, password, logger) {
    return this._userModel.findOne({ 'application': applicationId, 'credentials.username': { $exists: true, $eq: username } })
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.credentials.password)) {
          return user;
        }
      });
  }

  createWithCredentials (applicationId, username, password, logger) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const data = {
      application: applicationId,
      credentials: {
        username,
        password: hash
      }
    };
    const user = this._userService.model(data);
    return this._userService.create(user, logger)
      .then(() => user);
  }
}

module.exports = AuthService;
