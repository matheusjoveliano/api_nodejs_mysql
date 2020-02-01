'use strict';

var modelo = require('../modelo/conteudo-modelo.js')
  , fs = require('fs')
  , baseImgPath = require('../config/env').baseImgPath;

var controlador = {
  consultaConteudoPorIdTopico: consultaConteudoPorIdTopico
}

function consultaConteudoPorIdTopico(req, res) {
  var id = req.query.topico;
  req.getConnection(function (err, connection) {
    if (err) return res.sendStatus(500);

    modelo.consultaConteudoPorIdTopico(function (err, result) {
      if (err) return res.sendStatus(404);

      for (var i = 0; i < result.length; i++) {
        if (result[i].type == "I") {
          result[i].arquivo = fs.readFileSync(baseImgPath + "/" + result[i].arquivo);
        }
      }

      res.status(200).json(result);
    }, connection, id);
  });
}

module.exports = controlador;
