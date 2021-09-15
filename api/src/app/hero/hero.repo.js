'use strict';

const HeroModel = require('./hero.model');

async function create(data) {
  const heroCreated = new HeroModel(data);

  return await heroCreated.save();
}

async function findAll() {
  return await HeroModel.find().lean();
}

async function findOne(query) {
  return await HeroModel.findOne(query).lean();
}

async function findOneAndUpdate(query, data) {
  return await HeroModel.findOneAndUpdate(query, data);
}

async function findById(id) {
  return await HeroModel.findById(id).lean();
}
function deleteById(id) {
  return HeroModel.findByIdAndDelete(id);
}

module.exports = {
  create,
  findAll,
  findById,
  findOneAndUpdate,
  findOne,
  deleteById,
};
