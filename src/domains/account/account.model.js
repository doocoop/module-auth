'use strict';

const mongoose = require('mongoose');

class AccountModel {
  constructor (db, config) {
    const connection = db.connection();
    const Schema = mongoose.Schema;
    const ObjectId = mongoose.SchemaTypes.ObjectId;

    const AccountSchema = new Schema({
      owner: {
        type: ObjectId,
        ref: 'User',
        required: true
      },
      status: {
        type: String,
        enum: ['active', 'inactive', 'disabled'],
        required: true,
        default: 'active'
      },
      name: {
        type: String,
        required: true
      },
      users: [{
        user: {
          type: ObjectId,
          ref: 'User',
          required: true
        },
        role: {
          type: String,
          required: true
        }
      }]
    }, {
      timestamps: true
    });

    AccountSchema.methods.asData = function () {
      return {
        id: this._id,
        status: this.status,
        owner: this.owner,
        users: this.users
      };
    };

    return connection.model('Account', AccountSchema);
  }
}

module.exports = AccountModel;
