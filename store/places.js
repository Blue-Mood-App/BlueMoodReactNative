import axios from "axios";
import * as SecureStore from "expo-secure-store";
import location from "./serverInfo";

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
    const { data } = await axios.get(
      `${location}/api/places/?searchQuery=${searchQuery}&lat=${geo.coords.latitude}&long=${geo.coords.longitude}`,
      dispatch(getPlaces(data))
    );
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
