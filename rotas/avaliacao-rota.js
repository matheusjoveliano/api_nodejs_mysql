'use strict';

var express = require('express')
  , controller = require('../controladores/avaliacao-controlador')
  , router = express.Router();

router.post('/', controller.registraAvaliacao)

module.exports = router;
