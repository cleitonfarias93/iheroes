const UserModel = require('./user.model');

async function create(data) {
  const createdUser = new UserModel(data);
  return await createdUser.save();
}

async function find(filter, select) {
  return await UserModel.find(filter, select);
}

async function findOne(query) {
  return await UserModel.findOne(query).lean();
}

module.exports = {
  create,
  find,
  findOne,
};
