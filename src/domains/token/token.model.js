'use strict';

const mongoose = require('mongoose');

class TokenModel {
  constructor (db, config) {
    const connection = db.connection();
    const Schema = mongoose.Schema;
    const ObjectId = mongoose.SchemaTypes.ObjectId;

    const TokenSchema = new Schema({
      account: {
        type: ObjectId,
        ref: 'Account',
        required: true
      },
      application: {
        type: ObjectId,
        ref: 'Application',
        required: true
      },
      user: {
        type: ObjectId,
        ref: 'User',
        required: true
      },
      status: {
        type: String,
        enum: ['active', 'revoked'],
        required: true,
        default: 'active'
      },
      expires: [{
        type: Date,
        required: true
      }],
      claims: Schema.Types.Mixed
    }, {
      timestamps: true
    });

    TokenSchema.methods.asData = function () {
      return {
        user: this.user,
        status: this.status,
        claims: this.claims
      };
    };

    return connection.model('Token', TokenSchema);
  }
}

module.exports = TokenModel;
