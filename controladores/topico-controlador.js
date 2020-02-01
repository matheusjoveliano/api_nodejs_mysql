'use strict';

var modelo = require('../modelo/topico-modelo.js')
  , fs = require('fs')
  , baseImgPath = require('../config/env').baseImgPath;

var controlador = {
  consultaTopicoPorIdAssunto: consultaTopicoPorIdAssunto
}

function consultaTopicoPorIdAssunto(req, res) {

  var resultado = {};

  var id = req.query.assunto;
  req.getConnection(function (err, connection) {
    if (err) return res.sendStatus(500);

    modelo.pegaIconeDoTopico(function (err, resultIcone) {
      if (err) return res.sendStatus(404);

      for (var i = 0; i < resultIcone.length; i++) {
        resultIcone[i].nome_arquivo = fs.readFileSync(baseImgPath + "/" + resultIcone[i].nome_arquivo);
      }

      resultado.cabecalho = resultIcone;
    }, connection, id);

    modelo.consultaTopicoPorIdAssunto(function (err, result) {
      if (err) return res.sendStatus(404);
      resultado.topicos = result;
      res.status(200).json(resultado);
    }, connection, id);
  })
}

module.exports = controlador;
