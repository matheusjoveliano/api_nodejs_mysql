'use strict';

var modelo = {
  consultaTopicoPorIdAssunto: consultaTopicoPorIdAssunto,
  pesquisarTopico: pesquisarTopico,
  pegaIconeDoTopico: pegaIconeDoTopico
}

function pegaIconeDoTopico(callback, conexao, id) {
  conexao.query('SELECT a.assunto,\
                        nome_arquivo\
                FROM topicos as t\
                INNER JOIN assuntos AS a ON a.id_assunto = t.id_assunto\
                INNER JOIN imagens AS i ON i.id_assunto = a.id_assunto\
                INNER JOIN tipo_imagem AS ti ON ti.id_tipo_imagem = i.id_tipo_imagem\
                WHERE a.id_assunto = ' + id + ' AND ti.tipo = "I" limit 1', [], callback)
}

function consultaTopicoPorIdAssunto(callback, conexao, id) {
  conexao.query('SELECT t.id_topico,\
                        t.topico,\
                        c.id_conteudo,\
                        c.conteudo\
                FROM topicos AS t\
                INNER JOIN conteudos AS c ON c.id_topico = t.id_topico\
                WHERE t.id_assunto = ' + id, [], callback)
}

function pesquisarTopico(callback, conexao, data) {
  conexao.query('SELECT t.id_topico,\
                        t.topico,\
                        t.id_assunto,\
                        a.assunto,\
                        c.id_conteudo,\
                        c.conteudo,\
                        i.nome_arquivo\
                 FROM topicos as t\
                 INNER JOIN conteudos AS c ON c.id_topico = t.id_topico\
                 INNER JOIN assuntos AS a ON a.id_assunto = t.id_assunto\
                 INNER JOIN imagens AS i ON i.id_assunto = a.id_assunto\
                 INNER JOIN tipo_imagem AS ti ON ti.id_tipo_imagem = i.id_tipo_imagem AND ti.tipo = "I"\
                 WHERE topico LIKE "%' + data.query + '%"', [], callback)
}

module.exports = modelo;
