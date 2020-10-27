import jwtDecode from 'jwt-decode';
import { refreshTokens } from '../services';

const REFRESH_TOKEN = 'REFRESH_TOKEN';

let ACCESS_TOKEN = '';

export const setAccessToken = (s) => {
  ACCESS_TOKEN = s;
};

export const getAccessToken = () => {
  return ACCESS_TOKEN;
};

export const getHeaderOptions = async () => {
  const valid = isTokenValidOrUndefined();
  if (valid) {
    return getAccessToken();
  } else {
    try {
      const refreshToken = await getRefreshToken();
      if (refreshToken.access) {
        const newTokens = await refreshTokens(refreshToken);
        setAccessToken(newTokens.access.token);
        await setRefreshToken(newTokens.refresh.token);
        return newTokens.access.token;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}

export const isTokenValidOrUndefined = () => {
  const token = getAccessToken();
  if (!token) {
    return false;
  } 

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      return false;
    } else {
      return true;
    }
  } catch {
    return false;
  }
};

export const getItem = (key) => async () => {
  return await window.localStorage.getItem(key);
}

export const setItem = (key) => async (val) => {
  return await window.localStorage.setItem(key, val);
}

export const removeItem = (key) => async () => {
  return await window.localStorage.removeItem(key);
}

export const getRefreshToken = () => getItem(REFRESH_TOKEN)();
export const setRefreshToken = (token) => setItem(REFRESH_TOKEN)(token);
export const removeRefreshToken = () => removeItem(REFRESH_TOKEN)();