import Api from 'services/Api';

const resource = 'login';

export function postLogin(login) {
  return Api.post(resource, login);
}
