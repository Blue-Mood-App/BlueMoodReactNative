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

const GET_ACTIVITY = "GET_ACTIVITY";

const getActivity = (activity) => {
  return {
    type: GET_ACTIVITY,
    activity,
  };
};

export const fetchActivity = (moodId) => async (dispatch) => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN);
    if (token) {
      const { data } = await axios.get(`${location}/api/activities/${moodId}`, {
        headers: {
          authorization: token,
        },
      });

      console.log(data);
      dispatch(getActivity(data));
    } else {
      console.log("not logged in");
    }
  } catch (error) {}
};

export default function (state = {}, action) {
  switch (action.type) {
    case GET_ACTIVITY:
      return action.activity;
    default:
      return state;
  }
}
