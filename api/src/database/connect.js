const mongoose = require('mongoose');
const config = require('config');
const log = require('../logger');

function connect() {
  const dbUri = config.get('db.mongo.uri');

  return mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      log.info('Database connected');
    })
    .catch((error) => {
      log.error('Database error', error);
      process.exit(1);
    });
}

module.exports = connect;
