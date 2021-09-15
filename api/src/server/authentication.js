const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (req.path === '/login' || req.path === '/users') {
    return next();
  }

  if (!authHeader) {
    return res.status(httpStatus.UNAUTHORIZED).send({ error: 'No token provided' });
  }

  const partsToken = authHeader.split(' ');

  if (!partsToken.length === 2) {
    return res.status(httpStatus.UNAUTHORIZED).send({ error: 'Token error' });
  }

  const [scheme, token] = partsToken;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(httpStatus.UNAUTHORIZED).send({ error: 'Token malformed' });
  }

  jwt.verify(token, config.get('app.secret'), (err) => {
    if (err) {
      return res.status(httpStatus.UNAUTHORIZED).send({ error: 'Token Invalid' });
    }
    return next();
  });
};

module.exports = auth;
