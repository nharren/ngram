import superagent from 'superagent';
import * as util from '../lib/utilities.js';

export const tokenSet = (token) => ({
  type: 'TOKEN_SET',
  payload: token
});

export const tokenDelete = (token) => ({
  type: 'TOKEN_DELETE'
});

export const logout = () => {
  util.deleteCookie('X-Sluggram-Token')
  return { type: 'LOGOUT' }
}

export const signupRequest = (user) => (dispatch) => {
  return superagent.post(`${__API_URL__}/signup`)
  .withCredentials()
  .send(user)
  .then(response => {
    dispatch(tokenSet(response.text));
    try {
      localStorage.token = response.text;
    } 
    catch (error) {
      console.log(error);
    }

    return response;
  });
};

export const loginRequest = (user) => (dispatch) => {
  return superagent.get(`${__API_URL__}/login`)
  .withCredentials()
  .auth(user.username, user.password)
  .then(response => {
    dispatch(tokenSet(response.text))
    return response;
  });
}