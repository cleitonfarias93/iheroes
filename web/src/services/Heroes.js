import Api from 'services/Api';

const resource = 'heroes';

export function postHero(hero) {
  return Api.post(resource, hero);
}

export function getHeroes() {
  return Api.get(resource);
}

export function deleteHero(id) {
  return Api.delete(`${resource}/${id}`);
}

export function putHero(id, hero) {
  return Api.put(`${resource}/${id}`, hero);
}
