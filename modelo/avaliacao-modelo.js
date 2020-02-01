'use strict';

var modelo = {
  registraAvaliacao: registraAvaliacao
}

function registraAvaliacao(callback, conexao, data) {
  conexao.query('INSERT INTO avaliacao set ?', data, callback)
}

module.exports = modelo;
