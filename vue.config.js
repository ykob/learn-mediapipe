const fs = require('fs');

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./server.crt')
    }
  }
};
