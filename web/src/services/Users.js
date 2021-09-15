import Api from 'services/Api';

const resource = 'users';

export function postUsers(user) {
  return Api.post(resource, user);
}
