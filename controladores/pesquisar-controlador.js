'use strict';

var modeloConteudo = require('../modelo/conteudo-modelo.js')
  , modeloAssunto = require('../modelo/assunto-modelo.js')
  , modeloTopico = require('../modelo/topico-modelo.js')
  , Promise = require('promise')
  , fs = require('fs')
  , baseImgPath = require('../config/env').baseImgPath;

var controlador = {
  pesquisarTodos: pesquisarTodos
}

function pesquisarTodos(req, res) {

  var resultado = {}
  var data = {
    query: req.query.search
  }

  new Promise(function (resolve, reject) {
    req.getConnection(function (err, connection) {
      if (err) return reject(err);

      resolve(connection);
    });
  })
    .then(function (connection) {
      return new Promise(function (resolve, reject) {
        resultado.connection = connection
        modeloAssunto.pesquisarAssunto(function (err, resultAssunto) {
          if (err) return reject(err);

          for (var i = 0; i < resultAssunto.length; i++) {
            resultAssunto[i].nome_arquivo = fs.readFileSync(baseImgPath + "/" + resultAssunto[i].nome_arquivo);
          }

          resultado.assunto = resultAssunto;
          resolve(resultado);
        }, resultado.connection, data);
      });
    })
    .then(function (resultado) {
      return new Promise(function (resolve, reject) {
        modeloTopico.pesquisarTopico(function (err, resultTopico) {
          if (err) return reject(err);

          for (var i = 0; i < resultTopico.length; i++) {
            resultTopico[i].nome_arquivo = fs.readFileSync(baseImgPath + "/" + resultTopico[i].nome_arquivo);
          }

          resultado.topico = resultTopico;
          resolve(resultado);
        }, resultado.connection, data);
      });
    })
    .then(function (resultado) {
      return new Promise(function (resolve, reject) {
        modeloConteudo.pesquisarConteudo(function (err, resultConteudo) {
          if (err) return reject(err);

          for (var i = 0; i < resultConteudo.length; i++) {
            resultConteudo[i].nome_arquivo = fs.readFileSync(baseImgPath + "/" + resultConteudo[i].nome_arquivo);
          }

          resultado.conteudo = resultConteudo;
          resolve(resultado);
        }, resultado.connection, data);
      });
    })
    .then(function (resultado) {
      delete resultado.connection;
      res.status(200).json(resultado);
    })
    .catch(function (err) {
      res.status(500).send(err.message);
    });
}

module.exports = controlador;
