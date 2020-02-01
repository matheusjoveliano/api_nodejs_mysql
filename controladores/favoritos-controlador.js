'use strict';

var modelo = require('../modelo/favoritos-modelo.js')
  , fs = require('fs')
  , baseImgPath = require('../config/env').baseImgPath;

var controlador = {
  consultarFavoritos: consultarFavoritos
}

function consultarFavoritos(req, res) {
  req.getConnection(function (err, connection) {
    if (err) return res.sendStatus(500);

    modelo.consultarFavoritos(function (err, result) {
      if (err) return res.sendStatus(404);

      for (var i = 0; i < result.length; i++) {
        result[i].nome_arquivo = fs.readFileSync(baseImgPath + "/" + result[i].nome_arquivo);
      }

      res.status(200).json(result);
    }, connection);
  })
}

module.exports = controlador;
