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

const SET_SORTED_ACTIVITIES = "SET_SORTED_ACTIVITIES";

export const setSortedActivities = (activities) => {
  return {
    type: SET_SORTED_ACTIVITIES,
    activities,
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case SET_SORTED_ACTIVITIES:
      return action.activities;
    default:
      return state;
  }
}
