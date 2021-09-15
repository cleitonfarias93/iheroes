const httpStatus = require('http-status');
const { omit } = require('lodash');
const log = require('../../logger');
const UserService = require('./user.service');

module.exports = (router) => {
  router.post('/users', create);
};

async function create(req, res) {
  const { email } = req.body;

  try {
    const hasRegisteredUser = await UserService.findUserByEmail(email);

    if (hasRegisteredUser?.length) {
      return res.status(httpStatus.CONFLICT).send('Email already exist!');
    }

    const user = await UserService.create(req.body);

    res.status(httpStatus.CREATED).send(omit(user.toJSON(), 'password'));
  } catch (error) {
    log.error(error);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: 'Error trying to create user',
    });
  }
}
