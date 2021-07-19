import axios from "axios";
import location from "./serverInfo";
import * as SecureStore from "expo-secure-store";
const TOKEN = "token";

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

//moods thunk go here
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

//activities thunk goes here
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

//favoritActivity thunk goes here
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

//delete unselected favorite activites thunk goes here
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

//update contact list thunk goes here
export const setContactList =
  (agreedToMeet, displayName, phoneNumber, userId) => async () => {
    try {
      await axios.put(`${location}/api/registerActivities/${userId}`, {
        agreedToMeet,
        displayName,
        phoneNumber,
      });
    } catch (err) {
      console.log(err);
    }
  };

//update agreedToMeet thunk goes here
export const setUpdatedConnect = (agreedToMeet) => async () => {
  const token = await SecureStore.getItemAsync(TOKEN);
  try {
    if (token) {
      await axios.put(
        `${location}/api/registerActivities`,
        { agreedToMeet },
        {
          headers: {
            authorization: token,
          },
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

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
