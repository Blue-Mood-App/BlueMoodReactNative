import axios from "axios";
import Constants from "expo-constants";
const { manifest } = Constants;

const location = `http://${
  typeof manifest.packagerOpts === "object" && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(":")[0]
    : ""
}:1337`;

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
    const { data } = await axios.get(
      `${location}/api/registerActivities/moods`
    );
    dispatch(setMood(data));
  } catch (err) {
    console.error(err);
  }
};

//activities thunk
export const getActivities = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${location}/api/registerActivities/activities`
    );
    dispatch(setActivity(data));
  } catch (err) {
    console.error(err);
  }
};

//favoritActivity thunk
export const setFavActivity = (activityId, userId, moodId) => async () => {
  try {
    await axios.post(`${location}/api/registerActivities/`, {
      activityId,
      userId,
      moodId,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteFavActivity = (activityId, userId, moodId) => async () => {
  try {
    await axios.delete(
      `${location}/api/registerActivities/${activityId}/${userId}/${moodId}`
    );
  } catch (err) {
    console.log(err);
  }
};
//delete unselected favorite activites thunk goes here

//Reducer
export default function (state = { moods: [], activities: [] }, action) {
  switch (action.type) {
    case SET_MOOD:
      return { ...state, moods: action.moods };
    case SET_ACTIVITY:
      return { ...state, activities: action.activities };
    default:
      return state;
  }
}
