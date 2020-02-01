'use strict';

var modelo = require('../modelo/avaliacao-modelo.js');

var controlador = {
  registraAvaliacao: registraAvaliacao
};

function registraAvaliacao(req, res) {
  var data = {
    id_conteudo: req.body.id_conteudo,
    sim_nao: req.body.sim_nao,
    opiniao: req.body.opiniao,
    qtd_estrela: req.body.qtd_estrela
  }

  if (data.id_conteudo === null || data.id_conteudo === '') {
    return res.sendStatus(400);
  } else {
    req.getConnection(function (err, connection) {
      if (err) return res.sendStatus(500);

      modelo.registraAvaliacao(function (err, result) {
        if (err) return res.sendStatus(404);
        res.sendStatus(200);
      }, connection, data);
    });
  }
}

module.exports = controlador;
