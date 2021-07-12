import axios from "axios";
import { getActivities, getMoods } from "../store/registration";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
const { manifest } = Constants;

const location = `http://${
  typeof manifest.packagerOpts === "object" && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(":")[0]
    : ""
}:1337`;
const TOKEN = "token";

const SET_SORTED_ACTIVITIES = "SET_SORTED_ACTIVITIES";
const EDIT_SORTED_ACTIVITIES = "EDIT_SORTED_ACTIVITIES";

const sortUserActivities = (mood, activities, userActiv) => {
  let moodId = mood.id;
  let newArr = [];
  let newArr2 = [];
  let activitiesArr = [];

  for (let i = 0; i < activities.length; i++) {
    let newObj = { ...activities[i] };
    newObj.currentActivity = false;
    newObj.mood = mood.name;
    newObj.queensAddress = `${newObj["id"]}-${moodId}`;
    activitiesArr.push(newObj);
  }
  if (userActiv[0]) {
    for (let z = 0; z < userActiv.length; z++) {
      if (userActiv[z].moodId === moodId) {
        newArr.push(userActiv[z]);
      }
    }

    for (let z = 0; z < newArr.length; z++) {
      for (let j = 0; j < activitiesArr.length; j++) {
        if (activitiesArr[j].id === newArr[z].activityId) {
          if (!newArr2.includes(activitiesArr[j])) {
            activitiesArr[j].currentActivity = true;
            newArr2.push(activitiesArr[j]);
          }
        }
      }
    }

    for (let m = 0; m < activitiesArr.length; m++) {
      if (!newArr2.includes(activitiesArr[m])) {
        activitiesArr[m].currentActivity = false;
        newArr2.push(activitiesArr[m]);
      }
    }
  }

  return newArr2;
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

export const addedActivities = (activities) => {
  return {
    type: ADDED,
    activities,
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
    await axios.delete(`${location}/api/userActivities/${id}`);
    await axios.post(`${location}/api/userActivities`, {
      activities,
      id,
    });
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
    default:
      return state;
  }
}
