'use strict';

var modelo = {
  registraErro: registraErro
}

function registraErro(callback, conexao, data) {
  conexao.query('INSERT INTO erro set ?', data, callback)
}

module.exports = modelo;
