'use strict';

var modelo = {
  consultarTodosAssuntos: consultarTodosAssuntos,
  pesquisarAssunto: pesquisarAssunto
}

function consultarTodosAssuntos(callback, conexao) {
  conexao.query('SELECT a.id_assunto,\
                        a.assunto,\
                        i.nome_arquivo\
                FROM assuntos AS a\
                INNER JOIN imagens AS i ON i.id_assunto = a.id_assunto\
                INNER JOIN tipo_imagem AS ti ON ti.id_tipo_imagem = i.id_tipo_imagem\
                WHERE ti.tipo = "C"', [], callback)
}

function pesquisarAssunto(callback, conexao, data) {
  conexao.query('SELECT a.id_assunto,\
                        a.assunto,\
                        i.nome_arquivo\
                 FROM assuntos AS a\
                 INNER JOIN imagens AS i ON i.id_assunto = a.id_assunto\
                 INNER JOIN tipo_imagem AS ti ON ti.id_tipo_imagem = i.id_tipo_imagem\
                 WHERE assunto LIKE "%' + data.query + '%" AND ti.tipo = "I"', [], callback)
}

module.exports = modelo;
