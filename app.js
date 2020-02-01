'use strict';

var express = require('express')
  , cors = require('cors')
  , bodyParser = require('body-parser')
  // , methodOverride  = require('method-override')
  , db = require('./config/db-config.js')
  , baseApiPath = require('./config/env').baseApiPath
  , app = express();



// // server config
// app.use(methodOverride('X­HTTP­Method'));
// app.use(methodOverride('X­HTTP­Method­Override'));
// app.use(methodOverride('X­Method­Override'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(db);

app.use(function (request, response, next) {
  if (request.url === '/favicon.ico') {
    response.writeHead(200, {'Content-Type': 'image/x-icon'});
    response.end('');
  } else {
    next();
  }
});

app.use(function (req, res, next){
  console.info('------------------------------------------------------------');
  console.info('chegou!');
  console.info('url: %s and method: %s', req.url, req.method);
  console.info(req.body);
  console.info('------------------------------------------------------------');
  next();
});

// router
app.use(baseApiPath + '/assuntos', require('./rotas/assunto-rota'));
app.use(baseApiPath + '/topicos', require('./rotas/topico-rota'));
app.use(baseApiPath + '/conteudos', require('./rotas/conteudo-rotas'));
app.use(baseApiPath + '/avaliacao', require('./rotas/avaliacao-rota'));
app.use(baseApiPath + '/pesquisar', require('./rotas/pesquisar-rota'));
app.use(baseApiPath + '/favoritos', require('./rotas/favoritos-rota'));
app.use(baseApiPath + '/erro', require('./rotas/erro-rota'));
app.get(baseApiPath + '/ping', function(req, res){
  res.status(200).json({msg: "pong"});
});

// error handling
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next){
  console.log(err.stack);
  res.status(err.stack || 500).json({ err: err.message });
});

// server listener
module.exports = app;
