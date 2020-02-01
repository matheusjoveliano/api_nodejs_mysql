'use strict';

var express = require('express')
  , controller = require('../controladores/conteudo-controlador')
  , router = express.Router();

router.get('/', controller.consultaConteudoPorIdTopico)

module.exports = router;
