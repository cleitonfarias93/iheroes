const express = require('express');
const config = require('config');
const log = require('./logger');
const cors = require('cors');
const auth = require('./server/authentication');
const connect = require('./database/connect');
const routes = require('./routes');

const port = config.get('app.port');
const host = config.get('app.host');

const app = express();
app.use(express.json());
app.use(cors({ exposedHeaders: ['Content-Disposition'] }));
app.use(express.urlencoded({ extended: true }));
app.use(auth);

app.use(routes);

app.listen(port, host, () => {
  log.info(`Server listing as http://${host}:${port}`);
  connect();
});
