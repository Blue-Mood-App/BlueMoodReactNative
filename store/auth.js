import axios from "axios";
import * as SecureStore from "expo-secure-store";

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
  console.log("token pulled SecureStorage", token);
  if (token) {
    const res = await axios.get("http://127.0.0.1:1337/auth/me", {
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
      const res = await axios.post("http://127.0.0.1:1337/auth/login", {
        usernameEmail,
        password,
      });
      console.log("token in auth", res.data.token);
      await SecureStore.setItemAsync(TOKEN, res.data.token);
      dispatch(me());
      //history.push() we're going to need a method to send us to home page after login
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = async () => {
  await SecureStore.deleteItemAsync(TOKEN);
  //history.push() we're going to need a method to send us to home page after login
  return {
    type: SET_AUTH,
    auth: {},
  };
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
