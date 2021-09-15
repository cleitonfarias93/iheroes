const httpStatus = require('http-status');
const log = require('../../logger');
const LoginService = require('./login.service');

module.exports = (router) => {
  router.post('/login', login);
};
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const login = await LoginService.getLogin(email, password);

    if (!login) {
      return res.status(httpStatus.UNAUTHORIZED).send();
    }

    res.send(login);
  } catch (error) {
    log.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: 'Error trying to login',
    });
  }
}
