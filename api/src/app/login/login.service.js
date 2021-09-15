const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const UsuarioRepo = require('../user/user.repo');

async function getLogin(email, password) {
  const user = await UsuarioRepo.findOne({ email });
  const secretKey = config.get('app.secret');
  const oneHour = 3600;

  if (!user) {
    return;
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    return;
  }

  const token = jwt.sign({ user: user._id }, secretKey, {
    expiresIn: oneHour,
  });

  user.password = undefined;

  return { user, token };
}

module.exports = {
  getLogin,
};
