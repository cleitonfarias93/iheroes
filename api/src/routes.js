const router = require('express').Router();

require('./app/user/user.controller')(router);
require('./app/hero/hero.controller')(router);
require('./app/login/login.controller')(router);

module.exports = router;
