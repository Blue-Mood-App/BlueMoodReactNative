import axios from "axios";
import * as SecureStore from "expo-secure-store";
import location from './serverInfo'
import Constants from "expo-constants";
const { manifest } = Constants;


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
    console.log(manifest)
    const token = await SecureStore.getItemAsync(TOKEN);
    if (token) {
      const { data } = await axios.get(`${location}/api/activities/${moodId}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(getActivity(data));
    } else {
      const { data } = await axios.get(`${location}/api/activities/demo/${moodId}`)
      dispatch(getActivity(data))
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
