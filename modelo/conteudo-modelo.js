'use strict';

var modelo = {
  consultaConteudoPorIdTopico: consultaConteudoPorIdTopico,
  pesquisarConteudo: pesquisarConteudo
}

function consultaConteudoPorIdTopico(callback, conexao, id) {
  conexao.query('SELECT "I" as type, i.nome_arquivo as arquivo, c.id_conteudo\
                FROM conteudos AS c\
                LEFT JOIN imagem_conteudo AS ic ON ic.id_conteudo = c.id_conteudo\
                INNER JOIN imagens AS i ON i.id_imagem = ic.id_imagem\
                WHERE c.id_topico = '+ id + '\
                UNION ALL\
                SELECT "V" as type, v.src_upload as arquivo, c.id_conteudo\
                FROM conteudos AS c\
                LEFT JOIN video_conteudo AS vc ON vc.id_conteudo = c.id_conteudo\
                INNER JOIN videos AS v ON v.id_video = vc.id_video\
                WHERE c.id_topico = ' + id, [], callback)
}

function pesquisarConteudo(callback, conexao, data) {
  conexao.query('SELECT c.id_conteudo,\
                        c.conteudo,\
                        t.id_topico,\
                        t.topico,\
                        a.assunto,\
                        i.nome_arquivo\
                FROM conteudos AS c\
                INNER JOIN topicos AS t ON t.id_topico = c.id_topico\
                INNER JOIN assuntos AS a ON a.id_assunto = t.id_assunto\
                INNER JOIN imagens AS i ON i.id_assunto = a.id_assunto\
                INNER JOIN tipo_imagem AS ti ON ti.id_tipo_imagem = i.id_tipo_imagem AND ti.tipo = "I"\
                WHERE conteudo LIKE "%' + data.query + '%"', [], callback)
}

module.exports = modelo;
