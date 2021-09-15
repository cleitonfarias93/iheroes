const httpStatus = require('http-status');
const log = require('../../logger');
const HeroService = require('./hero.service');

module.exports = (router) => {
  router.post('/heroes', createHero);
  router.get('/heroes', getHeroes);
  router.get('/heroes/:id', getHeroById);
  router.put('/heroes/:id', updateHero);
  router.delete('/heroes/:id', deleteHeroById);
};

const createHero = async (req, res) => {
  try {
    const hero = await HeroService.createHero(req.body);

    if (!hero) {
      return res.status(httpStatus.CONFLICT).send('Already registered hero!');
    }

    res.status(httpStatus.CREATED).send(hero);
  } catch (error) {
    log.error(error);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: 'Error trying to create hero',
    });
  }
};

const getHeroes = async (req, res) => {
  try {
    const heroes = await HeroService.getAllHeroes();
    res.send(heroes);
  } catch (error) {
    log.error(error);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: 'Error trying to get heroes',
    });
  }
};

const getHeroById = async (req, res) => {
  try {
    const hero = await HeroService.getHeroById(req.params.id);

    if (!hero) {
      return res.status(httpStatus.NOT_FOUND).send('Hero not found!');
    }

    res.send(hero);
  } catch (error) {
    log.error(error);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: 'Error trying to get hero',
    });
  }
};

const updateHero = async (req, res) => {
  try {
    const hasHeroRegistered = await HeroService.getHeroById(req.params.id);

    if (!hasHeroRegistered) {
      return res.status(httpStatus.NOT_FOUND).send('Hero not found!');
    }

    await HeroService.updateHero(req.params.id, req.body);

    res.status(httpStatus.OK).send();
  } catch (error) {
    log.error(error);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: 'Error trying to update hero',
    });
  }
};

const deleteHeroById = async (req, res) => {
  try {
    const hasHeroRegistered = await HeroService.getHeroById(req.params.id);

    if (!hasHeroRegistered) {
      return res.status(httpStatus.NOT_FOUND).send('Hero not found!');
    }

    await HeroService.deleteHeroById(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    log.error(error);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: 'Error when trying to delete hero',
    });
  }
};
