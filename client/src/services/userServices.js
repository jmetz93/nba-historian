import api, {
  GET, POST,
} from './api';

export const getUser = (refreshToken) => api({
  path: 'v1/auth/currentUser',
  method: GET,
  headers: { authorization: refreshToken },
});

export const loginUser = (username, password) => api({
  path: 'v1/auth/login',
  method: POST,
  body: { username, password },
});

export const registerUser = (username, password) => api({
  path: 'v1/auth/register',
  method: POST,
  body: { username, password },
});

export const logoutUser = (refreshToken) => api({
  path: 'v1/auth/logout',
  method: POST,
  body: { refreshToken },
});

export const refreshTokens = (refreshToken) => api({
  path: 'auth/refreshTokens',
  method: POST,
  body: { refreshToken },
});