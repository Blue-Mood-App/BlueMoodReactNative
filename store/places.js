import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
const { manifest } = Constants;

const location = `http://${
  typeof manifest.packagerOpts === "object" && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(":")[0]
    : ""
}:1337`;
const TOKEN = "token";

const GET_PLACES = "GET_PLACES";

const getPlaces = (places) => {
  return {
    type: GET_PLACES,
    places,
  };
};

export const fetchPlaces = (searchQuery) => async (dispatch) => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN);
    if (token) {
      const { data } = await axios.get(`${location}/api/places/?searchQuery=${searchQuery}`, {
        headers: {
          authorization: token,
        },
      });

      console.log(data);
      dispatch(getPlaces(data));
    } else {
      console.log("not logged in");
    }
  } catch (error) {}
};

export default function (state = {}, action) {
  switch (action.type) {
    case GET_PLACES:
      return action.places;
    default:
      return state;
  }
}
