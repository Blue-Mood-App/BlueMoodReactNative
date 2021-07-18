import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
const { manifest } = Constants;
import location from './serverInfo'

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });
/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = await SecureStore.getItemAsync(TOKEN);

  if (token) {
    const res = await axios.get(`${location}/auth/me`, {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

// when dispatching authenticateLogin -- method is used to determine if it's "login" or "signup" use either or in place of method.
export const authenticateLogin =
  (usernameEmail, password) => async (dispatch) => {
    try {
      const res = await axios.post(`${location}/auth/login`, {
        usernameEmail,
        password,
      });
      await SecureStore.setItemAsync(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const authenticateRegister =
  (firstName, lastName, usernameEmail, password) => async (dispatch) => {
    try {
      const res = await axios.post(`${location}/auth/signup`, {
        firstName,
        lastName,
        usernameEmail,
        password,
      });
      await SecureStore.setItemAsync(TOKEN, res.data.token);
      dispatch(me());
      //history.push() we're going to need a method to send us to home page after login
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logOut = () => async (dispatch) => {
  await SecureStore.deleteItemAsync(TOKEN);
  dispatch(setAuth({}))
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
