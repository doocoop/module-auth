'use strict';

class JWT {
  constructor (jwt, secret, token) {
    this._jwt = jwt;
    this._secret = secret;
    this._token = token;
  }

  sign () {
    const options = Object.assign({}, this._token.claims, {
      jwtid: this._token._id.toString(),
      expiresIn: Math.floor((this._token.expires - Date.now()) / 1000)
    });
    let payload = {};
    if (this._user) {
      options.subject = this._user._id.toString();
      payload = this._user.getIdentity();
    }
    return this._jwt.sign(payload, this._secret, options);
  }
}

module.exports = JWT;
