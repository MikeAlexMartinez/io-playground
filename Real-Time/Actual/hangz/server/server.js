var express = require('express');
var https = require('https');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var SuperLogin = require('superlogin');
 
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
 
var config = {
  dbServer: {
    protocol: 'https://',
    host: '[YOUR-HOST]',
    user: '[YOUR-USER]',
    password: '[YOUR-PASSWORD]',
    cloudant: true,
    userDB: 'hangz-users',
    couchAuthDB: '_users'
  },
  security: {
    maxFailedLogins: 5,
    lockoutTime: 600,
    tokenLife: 604800, // one week
    loginOnRegistration: true
  },
  userDBs: {
    defaultDBs: {
      shared: ['hangz']
    },
    model: {
      hangz: {
        permissions: ['_reader', '_writer', '_replicator']
      }
    }
  },
  providers: { 
    local: true
  }
};
 
// Initialize SuperLogin 
var superlogin = new SuperLogin(config);
 
// Mount SuperLogin's routes to our app 
app.use('/auth', superlogin.router);
 
app.listen(process.env.PORT || 8080);