'use strict';

var modelo = require('../modelo/erro-modelo.js');

var controlador = {
  registraErro: registraErro
}

function registraErro(req, res) {
  var data = req.body;
  req.getConnection(function (err, connection) {
    if (err) return res.sendStatus(500);

    modelo.registraErro(function (err, result) {
      if (err) return res.sendStatus(404);
      res.status(200).json(result);
    }, connection, data);
  });
}

function registraErro(req, res) {
  new Promise(function (resolve, reject) {
    req.getConnection(function (err, connection) {
      if (err) return reject(err);
      resolve(connection);
    });
  })
    .then(function (connection) {
      return new Promise(function (resolve, reject) {
        var data = req.body.erros,
          count = data.length,
          resultado = [];

        for (var i = 0; i < count; i++) {
          modelo.registraErro(function (err, result) {
            resultado.push(result);
            if (err) return reject(err);
            if (resultado.length === count) {
              resolve(resultado);
            }
          }, connection, {
            data: data[i].data,
            hora: data[i].hora,
            erro: data[i].erro,
            version_code: data[i].version_code,
            version_name: data[i].version_name
          });
        }
      });
    })
    .then(function (resultado) {
      res.status(200).json(resultado);
    })
    .catch(function (err) {
      res.status(500).send(err.message);
    });
}

module.exports = controlador;
