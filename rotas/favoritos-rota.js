'use strict';

var express = require('express')
  , controller = require('../controladores/favoritos-controlador')
  , router = express.Router();

router.get('/', controller.consultarFavoritos)

module.exports = router;
