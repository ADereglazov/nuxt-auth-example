import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { initJwtMiddleware } from './middlewares/jwt';
import { logout, user } from './handlers';
import { generateAccessToken } from './accessToken';
import { refreshTokenHandler } from './refreshToken';
import { validateUser } from './utils/validateUser';
import { DEFAULT_USER_ID, DEFAULT_USER_SCOPE } from './constants';

// Создаем приложение express
const app = express();

// Install middleware
app.use(cookieParser());
app.use(bodyParser.json());

// JWT middleware
app.use(initJwtMiddleware(['/api/auth/login', '/api/auth/refresh']));

// -- Routes --

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const isValid = validateUser(username, password);

  if (!isValid) {
    throw new Error('Invalid username or password');
  }

  const accessToken = generateAccessToken({
    userId: DEFAULT_USER_ID,
    scope: DEFAULT_USER_SCOPE,
  });
  const refreshToken = refreshTokenHandler.create({ accessToken });

  res.json({
    token: {
      accessToken,
      refreshToken,
    },
  });
});

app.post('/refresh', (req, res) => {
  const { refreshToken: prevRefreshToken } = req.body;

  try {
    const accessToken = generateAccessToken({
      userId: DEFAULT_USER_ID,
      scope: DEFAULT_USER_SCOPE,
    });
    const nextRefreshToken = refreshTokenHandler.update(
      prevRefreshToken,
      accessToken
    );

    res.json({
      token: {
        accessToken,
        refreshToken: nextRefreshToken,
      },
    });
  } catch (e) {
    res.sendStatus(401);
  }
});

app.get('/user', user);
app.post('/logout', logout);

// Error handler
app.use((err, _req, res) => {
  res.json({
    err,
    _req,
    res,
  });
  // console.log(err);
  // res.status(401).send(err + '');
});

module.exports = {
  path: '/api/auth',
  handler: app,
};
