import axios from "axios";

//action creator
const SET_MOOD = "SET_MOOD";
const SET_ACTIVITY = "SET_ACTIVITY";

const setMood = (moods) => ({
  type: SET_MOOD,
  moods,
});

const setActivity = (activities) => ({
  type: SET_ACTIVITY,
  activities,
});

//moods thunk
export const getMoods = () => async (dispatch) => {
  try {
    console.log("in the thunk");
    const { data } = axios.get("/api/registerActivities/moods");
    console.log(data);
    dispatch(setMood(data));
  } catch (err) {
    console.error(err);
  }
};

//activities thunk
export const getActivities = () => async (dispatch) => {
  try {
    const { data } = axios.get("/api/registerActivities/activities");
    dispatch(setActivity(data));
  } catch (err) {
    console.error(err);
  }
};

//Reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_MOOD:
      return action.moods;
    case SET_ACTIVITY:
      return action.activities;
    default:
      return state;
  }
}
