const HeroRepo = require('./hero.repo');

const createHero = async (body) => {
  const { name } = body;
  const hasHeroRegistered = await HeroRepo.findOne({ name });

  if (hasHeroRegistered) {
    return;
  }

  const hero = await HeroRepo.create(body);

  return hero;
};

const getAllHeroes = async () => {
  const heroes = await HeroRepo.findAll();

  return heroes;
};

const getHeroById = async (id) => {
  const hero = await HeroRepo.findById(id);

  if (!hero) {
    return;
  }

  return hero;
};

const updateHero = async (id, body) => {
  const heroUpdated = HeroRepo.findOneAndUpdate({ _id: id }, body);

  return heroUpdated;
};

const deleteHeroById = (id) => {
  return HeroRepo.deleteById(id);
};

module.exports = {
  createHero,
  getAllHeroes,
  getHeroById,
  updateHero,
  deleteHeroById,
};
