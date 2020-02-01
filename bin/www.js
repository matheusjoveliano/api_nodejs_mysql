'use strict';

var app = require('../app.js');

var server = app.listen(3000, function() {
  console.log('Server listening on port ' + server.address().port);
});
