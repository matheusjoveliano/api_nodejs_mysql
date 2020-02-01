'use strict';

var express = require('express')
  , controller = require('../controladores/topico-controlador')
  , router = express.Router();

router.get('/', controller.consultaTopicoPorIdAssunto)

module.exports = router;
