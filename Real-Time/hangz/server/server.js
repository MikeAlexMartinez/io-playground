const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const SuperLogin = require('superlogin');
require('dotenv').config();

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const config = {
  dbServer: {
    protocol: 'http://',
    host: '127.0.0.1:5984',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
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
    }
  },
  providers: {
    local: true
  }
};

// initialize SuperLogin
const superLogin = new SuperLogin(config);

// Mount SuperLogin's routes to our app
app.use('/auth', superLogin.router);

app.listen(process.env.PORT || 8080);
