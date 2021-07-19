import axios from "axios";
import { getActivities, getMoods } from "../store/registration";
import * as SecureStore from "expo-secure-store";
import location from "./serverInfo";

const TOKEN = "token";

const SET_SORTED_ACTIVITIES = "SET_SORTED_ACTIVITIES";
const EDIT_SORTED_ACTIVITIES = "EDIT_SORTED_ACTIVITIES";
const DELETE_STATE = "DELETE_STATE";

const sortUserActivities = (mood, activities, userActiv) => {
  let moodId = mood.id;
  let activitiesArr = [];

  for (let i = 0; i < activities.length; i++) {
    let newObj = {
      ...activities[i],
    };
    newObj.currentActivity = false;
    newObj.mood = mood.name;
    newObj.queensAddress = `${newObj["id"]}-${moodId}`;
    activitiesArr.push(newObj);
  }

  for (let z = 0; z < userActiv.length; z++) {
    if (userActiv[z].moodId === moodId) {
      for (let m = 0; m < activitiesArr.length; m++) {
        if (activitiesArr[m].id === userActiv[z].activityId) {
          activitiesArr[m].currentActivity = true;
        }
      }
    }
  }

  activitiesArr.sort(function (x, y) {
    return x.currentActivity === y.currentActivity
      ? 0
      : x.currentActivity
      ? -1
      : 1;
  });

  return activitiesArr;
};

let sortedActivitiesArr = [];

export const setSortedActivities = (moods, activities, userActiv) => {
  moods.map((mood) => {
    sortedActivitiesArr.push(sortUserActivities(mood, activities, userActiv));
  });

  return {
    type: SET_SORTED_ACTIVITIES,
    sortedActivitiesArr,
  };
};

export const editMoodActivities = (activity) => {
  return {
    type: EDIT_SORTED_ACTIVITIES,
    activity,
  };
};

export const clear = () => {
  return {
    type: DELETE_STATE,
  };
};

export const getActivitiesAndMoods = (userId) => async (dispatch) => {
  try {
    const moods = await axios.get(`${location}/api/registerActivities/moods`);

    const activities = await axios.get(
      `${location}/api/registerActivities/activities`
    );

    const userActivities = await axios.get(
      `${location}/api/userActivities/${userId}`
    );
    dispatch(
      setSortedActivities(moods.data, activities.data, userActivities.data)
    );
  } catch (err) {
    console.error(err);
  }
};

export const addUserActivities = (id, activities) => async (dispatch) => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN);

    if (token) {
      await axios.post(
        `${location}/api/userActivities`,
        {
          activities,
          id,
        },
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

export default function (state = [], action) {
  switch (action.type) {
    case SET_SORTED_ACTIVITIES:
      return action.sortedActivitiesArr;
    case EDIT_SORTED_ACTIVITIES:
      let newState = [...state];
      for (let i = 0; i < newState.length; i++) {
        newState[i] = [...newState[i]];
        for (let z = 0; z < newState[i].length; z++) {
          if (newState[i][z].queensAddress === action.activity) {
            newState[i][z].currentActivity = !newState[i][z].currentActivity;
          }
        }
      }
      return newState;
    case DELETE_STATE:
      sortedActivitiesArr = [];
      return [];
    default:
      return state;
  }
}
