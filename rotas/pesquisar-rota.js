'use strict';

var express = require('express')
  , controller = require('../controladores/pesquisar-controlador')
  , router = express.Router();

router.get('/', controller.pesquisarTodos)

module.exports = router;
