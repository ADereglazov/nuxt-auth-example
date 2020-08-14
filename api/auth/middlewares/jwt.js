import jwt from 'express-jwt';

import { APPLICATION_SECRET } from '../constants';

export function initJwtMiddleware(path) {
  return jwt({
    secret: APPLICATION_SECRET,
    algorithms: ['HS256'],
    getToken: (req) => {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return null;
      }

      const [type, payload] = authorizationHeader.split(' ');
      if (type !== 'Bearer' || !payload) {
        return null;
      }

      return payload;
    },
  }).unless({ path });
}
