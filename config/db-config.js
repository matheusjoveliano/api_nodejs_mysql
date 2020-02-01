'use strict';

var mysql = require('mysql')
  , connection  = require('express-myconnection')
  , dbConfig = require('./env').db;

module.exports = connection(mysql, dbConfig, 'request');
