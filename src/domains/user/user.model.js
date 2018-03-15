'use strict';

const mongoose = require('mongoose');

class UserModel {
  constructor (db, config) {
    const connection = db.connection();
    const Schema = mongoose.Schema;
    const ObjectId = mongoose.SchemaTypes.ObjectId;

    const UserSchema = new Schema({
      application: {
        type: ObjectId,
        ref: 'Application',
        required: true
      },
      status: {
        type: String,
        enum: ['active', 'inactive', 'disabled'],
        required: true,
        default: 'active'
      },
      name: {
        type: String
        // required: true
      },
      email: {
        required: false,
        type: {
          address: {
            type: String,
            required: true
          },
          confirmed: {
            type: Boolean,
            required: true
          }
        }
      },
      credentials: {
        required: false,
        type: {
          username: {
            type: String,
            required: true
          },
          password: {
            type: String,
            required: true
          }
        }
      }
    }, {
      timestamps: true
    });

    UserSchema.methods.asData = function () {
      return {
        id: this._id,
        status: this.status,
        owner: this.owner,
        users: this.users
      };
    };

    UserSchema.methods.getIdentity = function () {
      return {
        name: this.name
      };
    };

    return connection.model('User', UserSchema);
  }
}

module.exports = UserModel;
