import axios from "axios";
import Constants from "expo-constants";
const { manifest } = Constants;

const location = `http://${
  typeof manifest.packagerOpts === "object" && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(":")[0]
    : ""
}:1337`;

GET_USERACTIVITIES = "GET_USERACTIVITIES";
const getUserActivities = (activities) => ({
  type: GET_USERACTIVITIES,
  activities,
});

export const fetchUserActivities = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${location}/api/userActivities/${userId}`
    );
    dispatch(getUserActivities(data));
  } catch (err) {
    console.error(err);
  }
};

export default function (state = {}, action) {
  switch (action.type) {
    case GET_USERACTIVITIES:
      return action.activities;
    default:
      return state;
  }
}
