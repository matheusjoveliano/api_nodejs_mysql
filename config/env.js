'use strict';

var env = {
      baseApiPath: '/api/v1',
      baseImgPath: process.env.SEFIN_IMG_PATH || "",
      db: {
        host: 'localhost',
        user: 'root',
        password : 'root',
        database:'database_name'
      }
    }

module.exports = env;
