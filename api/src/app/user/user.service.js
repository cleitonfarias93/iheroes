const bcrypt = require('bcrypt');
const UserRepo = require('./user.repo');

async function create(body) {
  const { password } = body;

  const encryptedPassword = hashedPassword(password);

  const data = {
    ...body,
    password: encryptedPassword,
  };

  const user = await UserRepo.create(data);

  return user;
}

async function findUserByEmail(email) {
  return await UserRepo.find({ email });
}

function hashedPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

module.exports = {
  create,
  findUserByEmail,
};
