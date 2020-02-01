'use strict';

var express = require('express')
  , controller = require('../controladores/assunto-controlador')
  , router = express.Router();

router.get('/', controller.consultarTodosAssuntos)

module.exports = router;
