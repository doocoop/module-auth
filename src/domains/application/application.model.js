'use strict';

const mongoose = require('mongoose');

class ApplicationModel {
  constructor (db, config) {
    const connection = db.connection();
    const Schema = mongoose.Schema;
    const ObjectId = mongoose.SchemaTypes.ObjectId;

    const ApplicationSchema = new Schema({
      account: {
        type: ObjectId,
        ref: 'Account',
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
      origins: [{
        type: String,
        required: true
      }],
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

    ApplicationSchema.methods.asData = function () {
      return {
        id: this._id,
        status: this.status,
        owner: this.owner,
        users: this.users
      };
    };

    return connection.model('Application', ApplicationSchema);
  }
}

module.exports = ApplicationModel;
