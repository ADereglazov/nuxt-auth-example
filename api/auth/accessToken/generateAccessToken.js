import jsonwebtoken from 'jsonwebtoken';

import { ACCESS_TOKEN_EXPIRATION, APPLICATION_SECRET } from '../constants';

export function generateAccessToken(payload) {
  return jsonwebtoken.sign(payload, APPLICATION_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
}
