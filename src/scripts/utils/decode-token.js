import { jwtDecode } from 'jwt-decode';
import { getCookie } from './cookie-helper';

export const getDecodedToken = () => {
  let token;
  token = getCookie('jwt');

  if (!token) {
    return null;
  }

  token = jwtDecode(token);
  return token;
};

export const getUserId = () => {
  const token = getDecodedToken();
  if (!token) {
    return null;
  }

  return token.user_id;
};

export const getUserRole = () => {
  const token = getDecodedToken();
  if (!token) {
    return null;
  }

  return token.role;
};
