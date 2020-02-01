'use strict';

var express = require('express')
  , controller = require('../controladores/erro-controlador')
  , router = express.Router();

router.post('/', controller.registraErro)

module.exports = router;
