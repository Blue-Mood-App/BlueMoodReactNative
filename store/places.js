import axios from "axios";
import * as SecureStore from "expo-secure-store";
import location from './serverInfo'

const TOKEN = "token";

const GET_PLACES = "GET_PLACES";

const getPlaces = (places) => {
  return {
    type: GET_PLACES,
    places,
  };
};

export const fetchPlaces = (searchQuery, geo) => async (dispatch) => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN);
    if (token) {
      const { data } = await axios.get(
        `${location}/api/places/?searchQuery=${searchQuery}&lat=${geo.coords.latitude}&long=${geo.coords.longitude}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      dispatch(getPlaces(data));
    } else {
      console.log("not logged in");
    }
  } catch (error) {
    console.log(error);
  }
};

export default function (state = {}, action) {
  switch (action.type) {
    case GET_PLACES:
      return action.places;
    default:
      return state;
  }
}
