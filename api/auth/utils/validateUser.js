import { DEFAULT_USER, DEFAULT_USER_PASSWORD } from '../constants';

export function validateUser(username, password) {
  return (
    username === DEFAULT_USER.username && password === DEFAULT_USER_PASSWORD
  );
}
