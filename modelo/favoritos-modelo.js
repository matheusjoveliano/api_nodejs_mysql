'use strict';

var modelo = {
  consultarFavoritos: consultarFavoritos
}

function consultarFavoritos(callback, conexao) {
  conexao.query('SELECT SUM(qtd_estrela) AS aceite,\
                         c.id_conteudo,\
                         a.assunto,\
                         t.topico,\
                         t.id_topico,\
                         c.conteudo,\
                         i.nome_arquivo\
                 FROM avaliacao AS av\
                 INNER JOIN conteudos AS c ON c.id_conteudo = av.id_conteudo\
                 INNER JOIN topicos AS t ON t.id_topico = c.id_topico\
                 INNER JOIN assuntos AS a ON a.id_assunto = t.id_assunto\
                 INNER JOIN imagens AS i ON i.id_assunto = a.id_assunto\
                 INNER JOIN tipo_imagem AS ti ON ti.id_tipo_imagem = i.id_tipo_imagem AND ti.tipo = "I"\
                 GROUP BY av.id_conteudo\
                 HAVING SUM(qtd_estrela) > 0\
                 ORDER BY aceite DESC\
                 LIMIT 10', [], callback)
}

module.exports = modelo;
