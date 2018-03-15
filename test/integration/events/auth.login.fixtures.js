'use strict';

const fixtures = {
  vars: {
    'invalid_credentials': {
      username: 'foo',
      password: 'bar'
    },
    'valid_credentials': {
      username: 'foobar',
      password: '0!23A'
    }
  },
  docs: [{
    model: 'account',
    data: {
      owner: '5aa48c1ecf5f5527847fe07a',
      status: 'active',
      name: 'doocoop.dev'
    },
    name: 'account_root'
  }, {
    model: 'application',
    data: {
      account: '<% account_root._id %>',
      origins: ['VALID_ORIGIN'],
      name: 'doocoop.dev.auth.in',
      status: 'active'
    },
    name: 'application_root'
  }, {
    service: 'auth',
    method: 'createWithCredentials',
    args: [
      '<% application_root._id %>',
      '<% valid_credentials.username %>',
      '<% valid_credentials.password %>'
    ],
    name: 'user_root'
  }]
};

module.exports = fixtures;
