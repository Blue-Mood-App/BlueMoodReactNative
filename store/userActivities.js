import axios from "axios";
import location from './serverInfo'

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
